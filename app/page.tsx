"use client"
import Footer from "./components/footer/Footer";
import MainPage from "./components/mainpage";
import { useAuthStore } from "./lib/userfetch";

export default function mainHome() {

  const { session, profile } = useAuthStore()

  return(
    <div className="common-wrap">
      <main>
        <MainPage />
      </main>
      <Footer />
    </div>
  )
}
