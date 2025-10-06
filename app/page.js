import Image from "next/image";
import MainSlide from "./components/MainSlide/MainSlide";

export default function Home() {
  return (
    <div className="common-wrap">
      <main>
        <MainSlide></MainSlide>
      </main>
    </div>
  );
}
