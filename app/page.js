import Image from "next/image";
import MainSlide from "./components/mainSlide/MainBanner";
import SectionPage from "./components/section1/SectionPage";

export default function Home() {
  return (
    <div className="common-wrap">
      <main>
        <MainSlide></MainSlide>
        <SectionPage></SectionPage>
      </main>
    </div>
  );
}
