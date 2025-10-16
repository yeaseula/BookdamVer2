import ReviewList from "./ReviewList";

export default async function ReviewPage() {
    const sheetId = '1EiQpFub62jL2VZOULwozl_f3hkz1J-wVec9rcSbR5CU';
    const gid = '1116419757';

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

    const myReview = async () => {
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

            const ReviewContent = {
                booktitle : title,
                bookauthor : author,
                bookoneline : oneline,
                bookdate : formattedDate
            }
            allReviews.unshift(ReviewContent)
        }

        return allReviews
    }

    const reviews = await myReview();

    return (
        <>
            <ReviewList reviews={reviews}></ReviewList>
        </>
    )
}