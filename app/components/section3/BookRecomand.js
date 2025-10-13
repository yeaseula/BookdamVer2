import SectionPageThree from "./SectionPage";
const kakaoKey = '302f0421ccb82381f281e48097885ede';

const keywords = ['소설', '러브', '사랑', '우정', '희망'];
export default async function FetchBooks() {
        try {
            const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
            const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${randomKeyword}&size=15`, {
                headers: {
                    Authorization: `KakaoAK ${kakaoKey}`
                }
            });
            const data = await response.json();

            const books = data?.documents || [];

            //console.log(data)
            // return data.documents.sort(() => 0.5 - Math.random()).slice(0, slideCount);
            // return <SectionPageThree books={books} />
            return <SectionPageThree books={books}></SectionPageThree>

        } catch(err) {
            console.error('kakao api 로드 실패:',err)
        }
    }