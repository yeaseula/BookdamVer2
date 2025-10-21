export default function MemoContent() {
    return(
        <>
            <div className="list-item" data-idx="${idx}">
                <div className="check-field">
                    <input type="checkbox" name="list-check" id="list${idx}" aria-label="목록 선택">
                    <label for="list${idx}"><i className="ri-check-line" aria-hidden="true"></i></label>
                </div>
                <div className="list-infor memo-type">
                    <blockquote>
                        <p className="memo-contents">${book.contents}</p>
                        <cite><span className="book-title">${book.title}</span> - <span className="page-number">${book.pages}</span> 페이지 중</cite>
                    </blockquote>
                </div>
            </div>
        </>
    )
}