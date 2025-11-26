"use client"
import Footer from "./components/footer/Footer";
import MainPage from "./components/mainpage";
import { useEffect } from "react";
import { useAuthStore } from "./lib/userfetch";

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
