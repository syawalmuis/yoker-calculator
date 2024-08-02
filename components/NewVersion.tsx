import { useRouter } from "next/navigation";

function NewVersion({ game }: { game: Game }) {
    const router = useRouter();
    return (
        <table className="table select-none w-full tracking-wide">
            <thead>
                <tr
                    className="cursor-pointer"
                    onClick={() => router.push(`/game/${game.id}/player`)}
                >
                    <td className="w-5 bg-base-100 sticky left-0" align="left">
                        Pemain
                    </td>
                    {Array.from({
                        length: game.rounds.current,
                    }).map((_, i) => (
                        <th key={i}>{i + 1}</th>
                    ))}
                    <th className="bg-base-100 sticky right-0">Skor</th>
                </tr>
            </thead>
            <tbody className="font-mono">
                {game.players.map((player) => (
                    <tr key={player.id}>
                        <td className="whitespace-nowrap sticky left-0 bg-base-100">
                            {player.name}
                        </td>
                        {Array.from({
                            length: game.rounds.current,
                        }).map((_, i) => (
                            <td
                                key={i}
                                onClick={() =>
                                    router.push(
                                        `/game/${game.id}/score?history_id=${i}`
                                    )
                                }
                                className="cursor-pointer"
                            >
                                {player.score.history[i]}
                            </td>
                        ))}
                        <td className="sticky right-0 bg-base-200">
                            {player.score.history.length > 0
                                ? player.score.history.reduce(
                                      (prev, current) =>
                                          Number(prev) + Number(current)
                                  )
                                : 0}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default NewVersion;
