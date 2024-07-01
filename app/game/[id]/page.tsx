"use client";

import { getDate } from "@/utils/date";
import { findGame } from "@/utils/game";
import { log } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

function Page({ params }: { params: { id: string } }) {
    const [game, setGame] = useState<Game | null>(null);
    const router = useRouter();
    console.log(game);

    useEffect(() => {
        // fetch game by id
        const game = findGame(params.id) as Game;
        setGame(game);
    }, [params.id]);
    return (
        <main className="px-5 py-10 min-h-screen ">
            <div className="card bg-base-100 md:max-w-lg w-full mx-auto">
                <div className="card-body">
                    <h1 className="card-title mb-4 flex justify-between gap-5 items-center">
                        <span>{game?.id}</span>
                        <span>{game && getDate(game?.createdAt)}</span>
                    </h1>
                    {game ? (
                        <div className="overflow-x-auto max-h-[70vh]">
                            <table className="table w-full table-pin-rows">
                                <thead>
                                    <tr className="">
                                        <th
                                            className="w-5 bg-base-100"
                                            align="center"
                                        >
                                            Ronde
                                        </th>
                                        {game.players.map((player) => (
                                            <td
                                                key={player.id}
                                                align="right"
                                                className="bg-base-100"
                                            >
                                                {player.name}
                                            </td>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({
                                        length: game.rounds.current,
                                    }).map((_, i) => (
                                        <tr
                                            key={i}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                router.push(
                                                    `/game/${game.id}/score?history_id=${i}`
                                                )
                                            }
                                        >
                                            <th className="w-5" align="center">
                                                {i + 1}
                                            </th>
                                            {game.players.map((player) => (
                                                <Fragment key={player.id}>
                                                    <td align="right">
                                                        {
                                                            player.score
                                                                .history[i]
                                                        }
                                                    </td>
                                                </Fragment>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="">
                                        <th
                                            className="w-5 bg-base-100"
                                            align="center"
                                        >
                                            {" "}
                                            Skor
                                        </th>
                                        {game.players.map((player) => (
                                            <td
                                                key={player.id}
                                                align="right"
                                                className="bg-base-200"
                                            >
                                                {player.score.history.length > 0
                                                    ? player.score.history.reduce(
                                                          (prev, current) =>
                                                              Number(prev) +
                                                              Number(current)
                                                      )
                                                    : 0}
                                            </td>
                                        ))}
                                    </tr>
                                </tfoot>
                            </table>
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
    );
}

export default Page;
