import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function NewVersion({ game }: { game: Game }) {
    const router = useRouter();
    const table = useRef(null);
    useEffect(() => {
        const wrapper = document.querySelector("#table");
        wrapper?.scrollBy(wrapper.scrollWidth, 0);
    }, []);
    return (
        <table className="table select-none w-full tracking-wide" ref={table}>
            <thead>
                <tr
                    className="cursor-pointer"
                    onClick={() => router.push(`/game/${game.id}/player`)}
                >
                    <td className="bg-base-100 sticky left-0" align="left">
                        Pemain
                    </td>
                    {Array.from({
                        length: game.rounds.current,
                    }).map((_, i) => (
                        <th key={i} align="right" className="w-5 font-mono">
                            {i + 1}
                        </th>
                    ))}
                    <th
                        className="w-5 bg-base-100 sticky right-0"
                        align="right"
                    >
                        Skor
                    </th>
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
                                className="cursor-pointer text-right font-mono"
                            >
                                {player.score.history[i]}
                            </td>
                        ))}
                        <td className="sticky right-0 bg-base-200 text-right whitespace-nowrap">
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
