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
        icon: "/favicon.png",
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
            <body className="bg-black min-h-screen">
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
                <div>{children}</div>
                <footer className="footer flex-1 text-neutral-content justify-center items-center p-4 !pb-6 gap-1">
                    <aside className="flex justify-center items-center ">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            className="fill-current"
                        >
                            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                        </svg>
                        <p>
                            Copyright © {new Date().getFullYear()} -{" "}
                            <a
                                target="_blank"
                                href="https://www.instagram.com/syawalmuiss/"
                            >
                                @syawalmuiss
                            </a>
                        </p>
                    </aside>
                </footer>
            </body>
        </html>
    );
}
