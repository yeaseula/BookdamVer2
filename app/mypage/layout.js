import Footer from "../components/footer/Footer";
export const metadata = {
    title: "mypage"
}

export default function RootLayout({children}){
    return(
        <>
            <main>{children}</main>
            <Footer />
        </>
    )
}