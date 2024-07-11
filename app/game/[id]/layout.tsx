"use client";
import Loading from "@/components/Loading";
import { AppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log(2);
        return () => {
            setIsLoading(false);
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
