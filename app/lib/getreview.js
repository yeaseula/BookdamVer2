const sheetId = '1EiQpFub62jL2VZOULwozl_f3hkz1J-wVec9rcSbR5CU';
const gid = '1116419757';
const kakaoKey = '302f0421ccb82381f281e48097885ede';

const fetchBookCover = async (title,author) => {
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

const loadGoogle =  async (sheetId, gid) => {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;
    const text = await fetch(url).then(r => r.text());
    const json = JSON.parse(
    text
        .replace("/*O_o*/", "")
        .replace("google.visualization.Query.setResponse(", "")
        .slice(0, -2)
    );
    return json.table.rows;
}

export const myReview = async () => {
    let allReviews = []
    const rows = await loadGoogle(sheetId, gid);

    rows.sort((a, b) => {
        const rawA = a.c[0]?.v || '';
        const rawB = b.c[0]?.v || '';
        const parseDate = (raw) => {
            const match = raw.match(/Date\((\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/);
            if (!match) return new Date(0);
            const [ , y, m, d, h, min, s ] = match.map(Number);
            return new Date(y, m, d, h, min, s);
        };
        return parseDate(rawB) - parseDate(rawA);
    });

    for (const row of rows) {
        const title = row.c[2]?.v || '';
        const oneline = row.c[6]?.v || '';
        const author = row.c[3]?.v || '';
        const rawDate = row.c[0]?.v || '';

        let formattedDate = '';

        const dateMatch = rawDate.match(/Date\((\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/);

        if (dateMatch) {
            const year = parseInt(dateMatch[1]);
            const month = parseInt(dateMatch[2]); // 0부터 시작
            const day = parseInt(dateMatch[3]);
            const hour = parseInt(dateMatch[4]);
            const minute = parseInt(dateMatch[5]);
            const second = parseInt(dateMatch[6]);

            const dateObj = new Date(year, month, day, hour, minute, second);

        // 원하는 포맷으로 변환 (예: 2025-07-23 09:20)
            const formattedMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
            const formattedDay = String(dateObj.getDate()).padStart(2, '0');
            const formattedHour = String(dateObj.getHours()).padStart(2, '0');
            const formattedMinute = String(dateObj.getMinutes()).padStart(2, '0');

            formattedDate = `${dateObj.getFullYear()}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}`;
        } else {
            console.warn('날짜 파싱 실패:', rawDate);
        }

        const thumbnail = await fetchBookCover(title, author);

        const ReviewContent = {
            booktitle : title,
            bookauthor : author,
            bookthumbnail : thumbnail,
            bookoneline : oneline,
            bookdate : formattedDate
        }
        allReviews.unshift(ReviewContent)
    }

    return allReviews
}

const sheetDateFormat = (rawDate) => {
    const dateMatch = rawDate.match(/Date\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!dateMatch) return rawDate;
    const year = dateMatch[1];
    const month = String(Number(dateMatch[2]) + 1).padStart(2, '0'); // 0부터 시작
    const day = String(dateMatch[3]).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const MyRaiting = (star) => {
    const score = star;
    const total = 10;
    document.querySelector('.icons-wrap').setAttribute(
        'aria-label',
        `내가 준 평점: ${total}점 만점에 ${score}점`
    );

    return score
    //별
    // const Selectedbox = document.querySelectorAll('.icons-detail');
    // Selectedbox.forEach((ele)=>{
    //     const Targets = Number(ele.getAttribute('data-score'));
    //     if(Targets <= score) {
    //         ele.classList.add('selected')
    //     }
    // })
}

export const loadReviewDetail = async (title, author) => {
    const rows = await loadGoogle(sheetId, gid);

    // 제목, 작가 모두 일치하는 row 찾기
    const review = rows.find(row =>
        (row.c[2]?.v || '') === title && (row.c[3]?.v || '') === author
    );
    if (!review) {
        console.log('리뷰 데이터를 찾을 수 없습니다.');
        return;
    }

    // 시트 인덱스에 따라 데이터 추출
    const cate = review.c[1]?.v || '';
    const startDateRaw = review.c[4]?.v || '';
    const endDateRaw = review.c[5]?.v || '';
    const oneline = review.c[6]?.v || '';
    const reviewTextRaw = review.c[7]?.v || '';
    const star = review.c[8]?.v || '';

    // 날짜 형식 변환
    const startDate = sheetDateFormat(startDateRaw);
    const endDate = sheetDateFormat(endDateRaw);

    //textarea로 받은 값은 줄바꿈없이 출력됩니다. 변환필요
    const reviewText = reviewTextRaw.replace(/\n/g, `<br>`);

    // 별점
    // MyRaiting(star);
    // 커버 이미지 넣기
    const thumb = await fetchBookCover(title, author);
    // if (thumb) {
    //     document.querySelector('.book-cover-img').style.backgroundImage = `url('${thumb}')`;
    // }

    const detailReturn = {
        thumbnail: thumb,
        category: cate,
        booktitle: title,
        bookauthor: `${author} 저`,
        startdate: startDate,
        enddate:endDate,
        onelinecont: oneline,
        reviewcont: reviewText,
        point:star
    }

    return detailReturn
}

// const reviews = await myReview();