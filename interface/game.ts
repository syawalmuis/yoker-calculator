interface Player {
    id: string;
    name: string;
    score: {
        current: number;
        history: number[];
    };
}

interface Game {
    id: string;
    players: Player[];
    rounds: {
        current: number;
    };
    createdAt: string;
}
