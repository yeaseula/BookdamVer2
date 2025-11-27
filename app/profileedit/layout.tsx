import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export const metadata = {
    title: "profileedit"
}

interface LayoutProps {
    children: React.ReactNode;
    headertitle?: string;
    headerRightSide?: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps){

    return(
        <div className="sub-wrap">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}