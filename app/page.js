import Image from "next/image";
import MainSlide from "./components/mainSlide/MainBanner";
import SectionPageOne from "./components/section1/SectionPage";
import Calendar from "./components/section2/Calendar";
import FetchBooks from "./components/section3/BookRecomand";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <div className="common-wrap">
      <main>
        <MainSlide></MainSlide>
        <SectionPageOne></SectionPageOne>
        <Calendar></Calendar>
        <FetchBooks></FetchBooks>
      </main>
      <Footer />
    </div>
  );
}