import React from "react";

const Loading = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0f172a] to-[#020617] flex items-center justify-center overflow-hidden relative">

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(59,130,246,.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,.25) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Glow Effects */}
            <div className="absolute w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full animate-pulse" />
            <div className="absolute w-80 h-80 bg-cyan-500/20 blur-[120px] rounded-full right-10 top-10 animate-pulse" />

            <div className="relative flex flex-col items-center gap-8">

                {/* Spinner */}
                <div className="relative">
                    <div className="w-28 h-28 border-4 border-blue-500/10 rounded-full" />

                    <div className="absolute inset-0 w-28 h-28 border-t-4 border-r-4 border-blue-500 rounded-full animate-spin" />

                    <div
                        className="absolute inset-4 border-t-4 border-cyan-400 rounded-full animate-spin"
                        style={{
                            animationDirection: "reverse",
                            animationDuration: "1.5s",
                        }}
                    />
                </div>

                {/* Text */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                        Loading
                    </h1>

                    <p className="text-slate-400">
                        Preparing something awesome...
                    </p>
                </div>

                {/* Dots */}
                <div className="flex gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
                    <span
                        className="w-3 h-3 bg-sky-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                    />
                    <span
                        className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Loading;