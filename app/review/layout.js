import Footer from "../components/footer/Footer";
export const metadata = {
    title: "review"
}

export default function RootLayout({children}){
    return(
        <>
            <main>{children}</main>
            <Footer />
        </>
    )
}