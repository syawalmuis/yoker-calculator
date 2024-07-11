"use client";
import { AppContext } from "@/context/AppContext";
import { ReactNode, useEffect, useState } from "react";
import Loading from "./Loading";

function App({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
        return () => {
            setIsLoading(true);
        };
    }, []);

    if (isLoading) return <Loading />;
    return (
        <AppContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </AppContext.Provider>
    );
}

export default App;
