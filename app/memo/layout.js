import Footer from "../components/footer/Footer";
export const metadata = {
    title: "memo"
}

export default function RootLayout({children}){
    return(
        <div className="sub-wrap">
            <main>{children}</main>
            <Footer />
        </div>
    )
}