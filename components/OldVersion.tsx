import { useRouter } from "next/navigation";
import { Fragment } from "react";

function OldVersion({ game }: { game: Game }) {
    const router = useRouter();
    return (
        <table className="table select-none w-full table-pin-rows table-pin-cols tracking-wide">
            <thead>
                <tr
                    className="cursor-pointer"
                    onClick={() => router.push(`/game/${game.id}/player`)}
                >
                    <th className="w-5 bg-base-100" align="center">
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
            <tbody className="font-mono">
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
                                <td align="right">{player.score.history[i]}</td>
                            </Fragment>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th className="w-5 bg-base-100 font-mono" align="center">
                        {" "}
                        Skor
                    </th>
                    {game.players.map((player) => (
                        <td
                            key={player.id}
                            align="right"
                            className="bg-base-200 text-[0.9rem] font-mono"
                        >
                            {player.score.history.length > 0
                                ? player.score.history.reduce(
                                      (prev, current) =>
                                          Number(prev) + Number(current)
                                  )
                                : 0}
                        </td>
                    ))}
                </tr>
            </tfoot>
        </table>
    );
}

export default OldVersion;
