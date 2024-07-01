"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { createGame } from "@/utils/game";
import { useRouter } from "next/navigation";

function Page() {
    const router = useRouter();
    const [players, setPlayers] = useState<string[]>([
        "Player 1",
        "Player 2",
        "Player 3",
        "Player 4",
        "Player 5",
    ]);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createGame(players);
        router.push("/");
    };

    const onChangePlayerInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newPlayers = [...players];
        newPlayers[index] = e.target.value;
        setPlayers(newPlayers);
    };
    return (
        <main className="min-h-screen flex items-center flex-col px-5 py-20">
            <div className="card bg-base-100 md:max-w-lg w-full">
                <div className="card-body">
                    <h1 className="card-title mb-4 flex items-center justify-between">
                        <span>Game Baru</span>
                        <Link href="/" className="btn btn-xs btn-error">
                            Kembali
                        </Link>
                    </h1>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <label
                                key={i}
                                className="input input-bordered input-sm flex items-center gap-2"
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
                                    onChange={(e) => onChangePlayerInput(e, i)}
                                    autoFocus={i === 0}
                                />
                            </label>
                        ))}

                        <button
                            type="submit"
                            className="btn btn-xs w-full btn-primary"
                        >
                            Buat Game
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Page;
