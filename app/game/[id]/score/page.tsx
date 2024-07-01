"use client";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { findGame, updateGame } from "@/utils/game";
import { useRouter, useSearchParams } from "next/navigation";
import { getDate } from "@/utils/date";

function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const history_id = searchParams.get("history_id");

    const [players, setPlayers] = useState<Player[]>([]);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPlayers = !history_id
            ? players.map((player) => {
                  return {
                      ...player,
                      score: {
                          ...player.score,
                          history: [
                              ...player.score.history,
                              player.score.current,
                          ],
                      },
                  };
              })
            : players;
        const newGame = {
            ...game,

            players: newPlayers,
            rounds: {
                current: Number(game?.rounds.current) + (history_id ? 0 : 1),
            },
        } as Game;
        updateGame(game?.id as string, newGame);
        e.currentTarget.reset();
        router.push(`/game/${game?.id}`);
    };

    const onChangePlayerScoreInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        const newPlayers = [...players];
        if (!history_id) {
            newPlayers[idx].score.current = parseInt(e.target.value);
        } else {
            newPlayers[idx].score.history[Number(history_id)] = parseInt(
                e.target.value
            );
        }
        setPlayers(newPlayers);
    };
    const [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        const game = findGame(params.id) as Game;
        setGame(game);
        setPlayers(game?.players);
    }, [params.id]);
    return (
        <main className="min-h-screen flex items-center flex-col px-5 py-20">
            <div className="card bg-base-100 md:max-w-lg w-full">
                <div className="card-body">
                    <h1 className="card-title mb-4 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span>
                                {game?.id} {" - "}
                                {game && getDate(game?.createdAt)}
                            </span>
                            <span className="text-sm">
                                ronde{" "}
                                {Number(history_id ?? game?.rounds.current) + 1}
                            </span>
                        </div>
                        <Link
                            href={`/game/${params.id}`}
                            className="btn btn-xs btn-error"
                        >
                            Kembali
                        </Link>
                    </h1>
                    <form className="space-y-2" onSubmit={onSubmit}>
                        {game?.players?.map((player, i) => (
                            <label
                                key={player.id}
                                className="form-control w-full"
                            >
                                <div className="label">
                                    <span className="label-text -mb-1">
                                        {player.name}
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Skor"
                                    className="input input-bordered w-full"
                                    onChange={(e) =>
                                        onChangePlayerScoreInput(e, i)
                                    }
                                    {...{
                                        defaultValue: history_id
                                            ? player.score.history[
                                                  Number(history_id)
                                              ]
                                            : "",
                                    }}
                                />
                            </label>
                        ))}

                        <button
                            type="submit"
                            className="btn w-full btn-sm !mt-4"
                        >
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Page;
