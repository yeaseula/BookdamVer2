export const metadata = {
    title: "signup"
}

export default function RootLayout({children}){
    return(
        <div className="sub-wrap">
            <main style={{ height: '100%' }}>{children}</main>
        </div>
    )
}