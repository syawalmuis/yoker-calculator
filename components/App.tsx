"use client";
import { AppContext } from "@/context/AppContext";
import { ReactNode, useEffect, useContext } from "react";

function App({ children }: { children: ReactNode }) {
    const { setIsLoading } = useContext(AppContext);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
        return () => {
            setIsLoading(true);
        };
    }, [setIsLoading]);
    return children;
}

export default App;
