"use client";
import { AppContext } from "@/context/AppContext";
import React, { ReactNode, useState } from "react";
import Loading from "./Loading";

function App({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            <AppContext.Provider value={{ isLoading, setIsLoading }}>
                <div>{isLoading ? <Loading /> : children}</div>
            </AppContext.Provider>
        </>
    );
}

export default App;
