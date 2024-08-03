import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Yoker Kalkulator",
    description:
        "Aplikasi ini digunakan untuk mencatat poin ketika sedang bermain yoker tanpa menggunakan buku dan pena",
    icons: {
        icon: "/favicon.ic",
        apple: "/apple-touch-icon.png",
    },
    openGraph: {
        title: "Yoker Kalkulator",
        description:
            "Aplikasi ini digunakan untuk mencatat poin ketika sedang bermain yoker tanpa menggunakan buku dan pena",
        type: "website",
        url: "https://yoker-kalkulator.vercel.app/",
        locale: "id_ID",
        images: [
            {
                url: "https://yoker-kalkulator.vercel.app/og-image.jpg",
                width: 800,
                height: 600,
                alt: "Yoker Kalkulator",
            },
        ],
    },
    authors: {
        name: "Syawal Muis",
        url: "https://syawalmuis.com",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    type="image/png"
                    sizes="96x96"
                    rel="icon"
                    href="/favicon.png"
                />
                <link
                    rel="apple-touch-icon"
                    href="/favicon.png"
                    type="image/png"
                />
            </head>
            <body className={inter.className}>
                <div className="navbar bg-base-100 relative z-10">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h7"
                                    />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link href={"/"}>Home</Link>
                                </li>
                                <li>
                                    <Link href={"/new-game"}>Game Baru</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <Link href={"/"} className="btn btn-ghost text-xl">
                            Yoker Kalkulator
                        </Link>
                    </div>
                    <div className="navbar-end"></div>
                </div>
                {children}
            </body>
        </html>
    );
}
