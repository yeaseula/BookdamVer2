import Header from "@/app/components/header/Header"
import Footer from "@/app/components/footer/Footer"
export const metadata = {
    title: "editnickname"
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