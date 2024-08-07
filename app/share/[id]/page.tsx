"use client";

import Loading from "@/components/Loading";
import { shareGame } from "@/utils/game";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const dynamic = 'force-dynamic';

function Page({ params }: { params: { id: string } }) {
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/share/${params.id}`, {
            cache: "no-store"
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data) return router.push("/");
                shareGame(JSON.parse(data[0].body));
                router.push(`/game/${data.id}`);
            })
            .catch((error) => {
                console.table(error);
            });
    }, [params.id, router]);
    return <Loading />;
}

export default Page;
