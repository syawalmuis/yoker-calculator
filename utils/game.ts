const getGames = () => {
    const games = JSON.parse(localStorage.getItem("games") as string);
    return games || [];
};

const createGame = (players: string[]) => {
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
};

const findGame = (id: string) => {
    const games = getGames() as Game[];
    return games.find((game) => game.id === id);
};

const updateGame = (id: string, game: Game) => {
    const games = getGames() as Game[];
    const index = games.findIndex((game) => game.id === id);
    games[index] = game;
    console.log(games[index], game);
    localStorage.setItem("games", JSON.stringify(games));
};

const updatePlayer = (id: string, players: string[]) => {
    const game = findGame(id);
    if (game) {
        players.forEach((name, i) => {
            let player = game.players[i];
            game.players[i] = { ...player, name };
        });
    }
    updateGame(id, game as Game);
};

export { getGames, createGame, findGame, updateGame, updatePlayer };
