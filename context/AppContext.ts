import { createContext, Dispatch, SetStateAction } from "react";

export const AppContext = createContext({
    isLoading: true,
    setIsLoading: (_: boolean) => {},
});
