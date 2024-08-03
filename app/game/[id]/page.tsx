"use client";

import App from "@/components/App";
import NewVersion from "@/components/NewVersion";
import OldVersion from "@/components/OldVersion";
import { AppContext } from "@/context/AppContext";
import { getDate } from "@/utils/date";
import { findGame } from "@/utils/game";
import { getVersion } from "@/utils/version";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

function Page({ params }: { params: { id: string } }) {
    const [game, setGame] = useState<Game | null>(null);
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [version, setVersion] = useState(searchParams.get("versi") ?? "new");

    useEffect(() => {
        const game = findGame(params.id) as Game;
        setGame(game);
    }, [params.id]);

    return (
        <App>
            <main className="px-5 py-10 min-h-[90vh]">
                <div className="card bg-base-100 md:max-w-lg w-full mx-auto mt-8">
                    <div className="card-body">
                        <h1 className="card-title mb-4 flex justify-between gap-5 items-center">
                            <div className="flex items-center justify-center gap-2 leading-4">
                                <span>{game?.id} </span>
                                <button
                                    className="px-4 py-1 leading-4 text-sm rounded-2xl bg-[#075e54] text-white flex items-center gap-1"
                                    onClick={() => {
                                        setIsLoading(true);
                                        fetch("/api/share", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify(game),
                                        })
                                            .then((res) => res.json())
                                            .then(() => {
                                                setIsLoading(false);
                                                location.href = `whatsapp://send?text=${location.origin}/share/${game?.id}`;
                                            });
                                    }}
                                    {...{ disabled: isLoading }}
                                >
                                    <FaWhatsapp className="text-lg" />{" "}
                                    {isLoading ? "Loading..." : "Share"}
                                </button>
                            </div>
                            <span className="uppercase tracking-wide font-mono text-sm">
                                Ronde {game && game.rounds.current}
                            </span>
                        </h1>
                        {game ? (
                            <div className="overflow-x-auto" id="table">
                                {version === "old" ? (
                                    <OldVersion game={game} />
                                ) : (
                                    <NewVersion game={game} />
                                )}
                            </div>
                        ) : (
                            <div>Game Tidak Ditemukan</div>
                        )}
                    </div>
                </div>
                <div className="fixed bottom-0 w-full bg-base-100 left-0 z-20 pt-6 pb-6 flex items-center justify-center">
                    <Link
                        href={`/game/${params.id}/score`}
                        className="border-white border-2 bg-primary h-14 w-14 flex items-center justify-center rounded-full text-white fill-white absolute -top-8 right-8"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                        </svg>
                    </Link>
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
                </div>
            </main>
        </App>
    );
}

export default Page;
