import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-xl">Loading...</p>
        </div>
    );
};

export default Loading;
