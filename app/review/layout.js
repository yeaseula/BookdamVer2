import Footer from "../components/footer/Footer";
export const metadata = {
    title: "review"
}

export default function RootLayout({children}){
    return(
        <div className="sub-wrap">
            <main>{children}</main>
            <Footer />
        </div>
    )
}