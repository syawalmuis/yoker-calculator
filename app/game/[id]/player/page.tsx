"use client";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { findGame, updatePlayer } from "@/utils/game";
import { useRouter } from "next/navigation";
import App from "@/components/App";
import { AppContext } from "@/context/AppContext";

function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [players, setPlayers] = useState<string[]>([]);
    const { setIsLoading } = useContext(AppContext);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updatePlayer(params.id, players, setIsLoading);
        router.push(`/game/${params.id}`);
    };

    const onChangePlayerInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newPlayers = [...players];
        newPlayers[index] = e.target.value;
        setPlayers(newPlayers);
    };

    useEffect(() => {
        const games = findGame(params.id) as Game;
        setPlayers(games.players.map((player) => player.name));
    }, [params.id]);

    return (
        <App>
            <main className=" flex items-center flex-col px-5 py-20">
                <div className="card bg-base-100 md:max-w-lg w-full">
                    <div className="card-body">
                        <h1 className="card-title mb-4 flex items-center justify-between gap-5">
                            <span>Player Game {params.id}</span>
                            <Link
                                href={`/game/${params.id}`}
                                className="btn btn-xs btn-error"
                            >
                                Kembali
                            </Link>
                        </h1>
                        <form className="space-y-4" onSubmit={onSubmit}>
                            {players.map((name, i) => (
                                <label
                                    key={i}
                                    className="input input-bordered flex items-center gap-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder={`Player ${i + 1}`}
                                        onChange={(e) =>
                                            onChangePlayerInput(e, i)
                                        }
                                        autoFocus={i === 0}
                                        defaultValue={name}
                                    />
                                </label>
                            ))}

                            <button
                                type="submit"
                                className="btn btn-sm w-full btn-primary"
                            >
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </App>
    );
}

export default Page;
