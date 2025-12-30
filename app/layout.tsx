import StyledComponentsRegistry from "./lib/resistry";
import "./globals.css";
import ClientRoot from "./components/ClientRoot";
import createClient from "@/utils/supabase/server";
import { AppleSDGothicNeo } from "@/public/fonts/fonts";
import { ToastContainer } from "react-toastify";
import Toast from "./components/modal/Toast";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navigation/NavBar";

export const metadata = {
  title: "책담",
  description: "독서를 경험으로 만든는 나만의 독서 리뷰 다이어리",
  openGraph: {
    title: "책담",
    description: "독서를 경험으로 만든는 나만의 독서 리뷰 다이어리",
    url: "https://bookdam-ver2.vercel.app",
    siteName: "Bookdam",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630
      }
    ],
    locale: "ko_KR",
    type: "website"
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const {
    session, profile,
    reviews, memo, books, log, wish, settings
  } = await createClient()
  return (
    <html lang="ko" className={AppleSDGothicNeo.className}>
      <body>
        <div className="relative width-[100%] shadow-2xl overflow-x-hidden bg-[var(--color_white)]">
          <StyledComponentsRegistry>
            <ClientRoot
            initialSession={session}
            initialProfile={profile}
            initialReview={reviews}
            initialMemo={memo}
            initialBooks={books}
            initialLog={log}
            initialWish={wish}
            initialSettings={settings}
            >
              <ToastContainer limit={3} />
              <Toast />
              <Header />
              {children}
              <Footer />
              <NavBar />
            </ClientRoot>
          </StyledComponentsRegistry>
        </div>
      </body>
    </html>
  );
}
