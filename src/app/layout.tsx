import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/navbar/navbar";
import { Sarpanch } from "next/font/google";
import { AuthProvider } from "@/contexts/auth.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "IEEE-CS Enrollments Portal 2024",
  description: "Portal for the new junior core to select their domains",
  themeColor: "#150b23",
};

const sarpanch = Sarpanch({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sarpanch",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sarpanch.variable}`}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:image" content="/logo.svg" />
      </head>
      <body className="bg-main-bg min-h-screen bg-[url('/back-grid-vertical.svg')] md:bg-[url('/back-grid-horizontal.svg')] bg-cover bg-center bg-fixed">
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
