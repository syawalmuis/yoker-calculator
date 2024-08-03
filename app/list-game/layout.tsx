import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Yoker Kalkulator - Daftar Game",
    description:
        "Aplikasi ini digunakan untuk membantu player yoker yg tidak ada modal book & pen",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
