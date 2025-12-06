"use client"
import Footer from "./components/footer/Footer";
import MainPage from "./components/mainpage";

export default function mainHome() {
  return(
    <div className="common-wrap">
      <main>
        <MainPage />
      </main>
      <Footer />
    </div>
  )
}
