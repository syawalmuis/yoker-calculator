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
            <main className="px-5 py-10 min-h-screen ">
                <div className="card bg-base-100 md:max-w-lg w-full mx-auto">
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
                            <div
                                className="overflow-x-auto max-h-[70vh]"
                                id="table"
                            >
                                {version === "old" ? (
                                    <OldVersion game={game} />
                                ) : (
                                    <NewVersion game={game} />
                                )}
                            </div>
                        ) : (
                            <div>No game found</div>
                        )}
                    </div>
                </div>
                <div className="fixed bottom-4 right-4 z-20">
                    <Link
                        href={`/game/${params.id}/score`}
                        className="border-white border-2 bg-primary h-14 w-14 flex items-center justify-center rounded-full text-white fill-white"
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
                </div>
            </main>
        </App>
    );
}

export default Page;
