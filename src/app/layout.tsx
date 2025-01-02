import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner"


//todo: change default font's using next/font once we get the font files
const fkTrial = localFont({
  src: [
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Regular.otf",
      style: "normal",
    },
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Medium.otf",
      weight: "500",
    },
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--fk-trial",
});

const editorial = localFont({
  src: [
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-Italic-BF644b214fb0c0a.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-Regular-BF644b214ff145f.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-Ultrabold-BF644b21500840c.otf",
      weight: "700",
      style: "ultrabold",
    },
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-UltraboldItalic-BF644b214faef01.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-Ultralight-BF644b21500d0c0.otf",
      weight: "200",
      style: "extralight",
    },
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-UltralightItalic-BF644b214ff1e9b.otf",
      weight: "200",
      style: "italic",
    },
  ],
  variable: "--editorial",
});


export const metadata: Metadata = {
  title: "Riviera 2025",
  description:
    "The Annual International Sports and National Cultural Festival. We invite Participants from all colleges for the 3 days Riviera 2025 Events. Register Now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fkTrial.variable} ${editorial.variable} antialiased`}>
        <Navbar />
        <div className="relative">
          <div className="flex min-h-screen mx-auto flex-col max-w-[90rem] bg-background px-4 md:px-6">
            {children}
          </div>
        </div>
        {/* <Footer /> */}
        <Toaster />
      </body>
    </html>
  );
}
