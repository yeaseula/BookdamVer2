"use client"
import MainPage from "./components/mainpage";
import { Main, CommonWrap } from "./components/common/container.styled";

export default function MainRoot() {

  return(
    <CommonWrap>
      <Main>
        <MainPage />
      </Main>
    </CommonWrap>
  )
}
