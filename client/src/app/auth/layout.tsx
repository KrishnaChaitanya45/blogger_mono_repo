import type { Metadata } from "next";
import { Inter, Barlow, Rubik, Poppins, Abhaya_Libre } from "next/font/google";
import "../globals.css";
import localFont from "next/font/local";
import RegisterOrLoginProvider from "@/contexts/RegisterOrLogin";
import AuthContextProvider from "@/contexts/AuthContext";
import Providers from "@/providers/TRPC_Provider";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const BarlowFont = Barlow({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
});
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const clashDisplay = localFont({
  src: "../../../public/fonts/ClashDisplay-Variable.ttf",
  variable: "--font-clash-display",
});
const abhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-libre",
});
export const metadata: Metadata = {
  title: "Authentication",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${inter.variable} ${BarlowFont.variable} ${poppins.variable} ${clashDisplay.variable} ${abhayaLibre.variable}`}
      >
        <Providers>
          <AuthContextProvider>
            <RegisterOrLoginProvider>{children}</RegisterOrLoginProvider>
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}