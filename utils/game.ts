const getGames = () => {
    const games = JSON.parse(localStorage.getItem("games") as string);
    return games || [];
};

const excecuteCallback = (
    callback: ((_: boolean) => void) | null,
    params: boolean
) => {
    if (typeof callback === "function") callback(params);
};

const createGame = (
    players: string[],
    setIsLoading: ((_: boolean) => void) | null = null
) => {
    excecuteCallback(setIsLoading, true);
    const game: Game = {
        id: Math.random().toString(36).substring(7),
        players: players.map((name) => ({
            id: Math.random().toString(36).substring(7),
            name,
            score: {
                current: 0,
                history: [],
            },
        })),
        rounds: {
            current: 0,
        },
        createdAt: String(new Date()),
    };
    localStorage.setItem("games", JSON.stringify([...getGames(), game]));
    excecuteCallback(setIsLoading, false);
    return game;
};

const shareGame = (game: Game) => {
    localStorage.setItem("games", JSON.stringify([...getGames(), game]));
};

const findGame = (id: string) => {
    const games = getGames() as Game[];
    const game = games.find((game) => game.id === id);

    return (
        {
            ...game,
            player: game?.rounds.current
                ? game?.players.sort(
                      (a, b) =>
                          b.score.history?.reduce((prev, next) => prev + next) -
                          a.score.history?.reduce((prev, next) => prev + next)
                  )
                : game?.players.sort(),
        } || null
    );
};

const updateGame = (
    id: string,
    game: Game,
    setIsLoading: ((_: boolean) => void) | null = null
) => {
    excecuteCallback(setIsLoading, true);
    const games = getGames() as Game[];
    const index = games.findIndex((game) => game.id === id);
    games[index] = game;
    console.log(games[index], game);
    localStorage.setItem("games", JSON.stringify(games));
    setTimeout(() => {
        excecuteCallback(setIsLoading, false);
    }, 100);
};

const updatePlayer = (
    id: string,
    players: string[],
    setIsLoading: ((_: boolean) => void) | null = null
) => {
    excecuteCallback(setIsLoading, true);
    const game = findGame(id);
    if (game) {
        players.forEach((name, i) => {
            if (game.players) {
                let player = game.players[i];
                game.players[i] = { ...player, name };
            }
        });
    }
    updateGame(id, game as Game, setIsLoading);
};

export { getGames, createGame, findGame, updateGame, updatePlayer, shareGame };
