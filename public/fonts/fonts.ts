import localFont from "next/font/local";

export const AppleSDGothicNeo = localFont({
  src: [
    {
      path: "../fonts/AppleSDGothicNeoR00.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/AppleSDGothicNeoM00.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/AppleSDGothicNeoB00.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/AppleSDGothicNeoEB00.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-apple-neo",
  display: "swap",
});
