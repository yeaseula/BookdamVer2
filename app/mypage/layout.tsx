import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
export const metadata = {
    title: "mypage"
}

export default function RootLayout({children}){
    return(
        <>
        <div className="sub-wrap">
            <main>{children}</main>
            <Footer />
        </div>
        </>
    )
}