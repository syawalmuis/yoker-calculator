"use client";
import Loading from "@/components/Loading";
import { AppContext } from "@/context/AppContext";
import { ReactNode, useEffect, useState } from "react";

function Layout({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
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

export default Layout;
