import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";


const Courgette = localFont({
  src: "./fonts/Courgette-Regular.ttf",
  variable: "--font-courgette",
});
const Halant = localFont({
  src: [
    {
      path: './fonts/Halant-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Halant-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Halant-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Halant-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Halant-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-halant',
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});
export const metadata: Metadata = {
  title: "Lotti's Playground",
  description: "Music, Videos, Shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Courgette.variable} ${Halant.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
