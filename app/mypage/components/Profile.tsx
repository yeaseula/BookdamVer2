import styled from "styled-components"

const Container = styled.div`

`

export default function Profile({username}) {
    return(
        <>
            <div></div>
            <div>
                <p className="text-4xl font-bold">{username}</p>
                <p>
                    <span>#국내소설</span>
                    <span>#과학</span>
                </p>
            </div>
        </>
    )
}