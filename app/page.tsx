"use client";
import { useContext, useEffect, useState } from "react";
import { getGames } from "../utils/game";
import { getDate } from "../utils/date";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";
import { log } from "console";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { setVersion } from "@/utils/version";

export default function Home() {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setGames(getGames());
        return setIsLoading(false);
    }, []);
    if (isLoading) return <Loading />;
    return (
        <main className="flex  flex-col items-center p-5">
            <div className="card bg-base-100 md:max-w-lg w-full mx-auto">
                <div className="card-body">
                    <h1 className="card-title uppercase tracking-wider mb-5 flex justify-between items-center gap-5">
                        <span>Daftar Game</span>
                        <Link
                            className="btn btn-primary btn-xs normal-case"
                            href={"/new-game"}
                        >
                            Game Baru
                        </Link>
                    </h1>
                    <div className="overflow-x-auto">
                        {games.length > 0 ? (
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th className="w-1"></th>
                                        <th>ID Game</th>
                                        <th>Tanggal</th>
                                        <th align="right">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.map((game, index) => (
                                        <tr key={game.id}>
                                            <td className="w-1">{index + 1}</td>
                                            <td>{game.id}</td>
                                            <td>{getDate(game.createdAt)}</td>
                                            <td align="right">
                                                <button
                                                    className="badge badge-neutral badge-sm"
                                                    onClick={() => {
                                                        setIsLoading(true);
                                                        router.push(
                                                            "/game/" + game.id
                                                        );
                                                    }}
                                                >
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center">No game found</div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
