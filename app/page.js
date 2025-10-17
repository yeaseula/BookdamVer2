import MainSlide from "./components/mainSlide/MainBanner";
import SectionPageOne from "./components/section1/SectionPage";
import Calendar from "./components/section2/Calendar";
import FetchBooks from "./components/section3/BookRecomand";
import Footer from "./components/footer/Footer";

const sheetId = '1EiQpFub62jL2VZOULwozl_f3hkz1J-wVec9rcSbR5CU';
const gid = '1116419757';
const kakaoKey = '302f0421ccb82381f281e48097885ede';

const fetchbookCover = async (title,author) => {
    try {
        const query = `${title} ${author}`;
        const apiUrl = `https://dapi.kakao.com/v3/search/book?target=all&query=${encodeURIComponent(query)}`;

        const res = await fetch(apiUrl, {
            headers: {
                Authorization: `KakaoAK ${kakaoKey}`
            }
        });
        const data = await res.json();
        const filtered = data.documents.find(book =>
            book.title.includes(title) && book.authors.join(',').includes(author)
        );

        return (filtered || data.documents[0])?.thumbnail || '';

        } catch (e) {
            console.error('카카오 API 오류:', e);
            return '';
        }
}

const sheetDateFormat = (rawDate) => {
    const dateMatch = rawDate.match(/Date\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!dateMatch) return rawDate;
        const year = dateMatch[1];
        const month = String(Number(dateMatch[2]) + 1).padStart(2, '0'); // 0부터 시작
        const day = String(dateMatch[3]).padStart(2, '0');
        return `${year}-${month}-${day}`;
}

const fetchGoogleData = async () => {
  let stampDates = []
  let mainSlideData = []

  try {
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;
      const res = await fetch(url);
      const text = await res.text();
      const json = JSON.parse(
          text
            .replace("/*O_o*/", "")
            .replace("google.visualization.Query.setResponse(", "")
            .slice(0, -2)
      );

      const rows = json.table.rows;

      for(const row of rows) {
          //캘린더에 필요한 데이터
          const endDateRaw = row.c[5]?.v || '';

          // 날짜 형식 변환
          const endDate = sheetDateFormat(endDateRaw);
          stampDates.push(endDate);

          //메인 슬라이드에 필요한 데이터
          const title = row.c[2]?.v || '';
          const author = row.c[3]?.v || '';

          const thumb = await fetchbookCover(title,author);
          mainSlideData.unshift(thumb);
        }
        return [mainSlideData,stampDates]
  }catch(err) {
      console.error('google 데이터 로드 실패:',err)
  }
}

export default async function mainHome() {
  const googledata = await fetchGoogleData()

  const slide = googledata[0]
  const stamp = googledata[1]
  const readingCount = slide.length

  return(
    <div className="common-wrap">
      <main>
        <MainSlide slide={slide} readingCount={readingCount}></MainSlide>
        <SectionPageOne readingCount={readingCount}></SectionPageOne>
        <Calendar stamp={stamp}></Calendar>
        <FetchBooks></FetchBooks>
      </main>
      <Footer />
    </div>
  )
}

await mainHome()
