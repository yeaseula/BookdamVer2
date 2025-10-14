import Footer from "../components/footer/Footer";
import NavBar from "../components/navigation/NavBar";

export const metadata = {
    title: "review"
}

export default function RootLayout({children}){
    return(
        <>
            <main>{children}</main>
            <Footer />
            <NavBar/>
        </>
    )
}