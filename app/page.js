import Image from "next/image";
import MainSlide from "./components/mainSlide/MainBanner";
import SectionPage from "./components/section1/SectionPage";
import Calendar from "./components/section2/Calendar";

export default function Home() {
  return (
    <div className="common-wrap">
      <main>
        <MainSlide></MainSlide>
        <SectionPage></SectionPage>
        <Calendar></Calendar>
      </main>
    </div>
  );
}
