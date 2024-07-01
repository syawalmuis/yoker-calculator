// get date
function formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
}

// get date with month
export function getDate(date: string): string {
    return new Date(date).toLocaleDateString("id-ID", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}
