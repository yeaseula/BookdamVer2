import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export const metadata = {
    title: "reading"
}

export default function RootLayout({ children }){

    return(
        <div className="sub-wrap">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}