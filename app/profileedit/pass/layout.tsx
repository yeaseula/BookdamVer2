import Header from "@/app/components/header/Header"
import Footer from "@/app/components/footer/Footer"
export const metadata = {
    title: "editPass"
}

export default function RootLayout({children}){
    return(
        <>
            <main>{children}</main>
            <Footer />
        </>
    )
}