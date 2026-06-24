'use client';

import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0f172a] to-[#020617] flex items-center justify-center px-6 overflow-hidden relative">

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
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full animate-pulse" />

            <div className="relative text-center max-w-2xl">

                {/* 404 */}
                <h1 className="text-[120px] md:text-[180px] font-black bg-linear-to-r from-blue-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent leading-none">
                    404
                </h1>

                <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
                    Page Not Found
                </h2>

                <p className="text-slate-400 mt-6 text-lg leading-relaxed">
                    The page you are looking for does not exist, was moved,
                    or is temporarily unavailable.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mt-10">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.35)]"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800/50 transition-all duration-300"
                    >
                        Go Back
                    </button>
                </div>

                {/* Floating Dots */}
                <div className="absolute -top-10 -left-10 w-4 h-4 bg-blue-500 rounded-full animate-ping" />
                <div className="absolute top-20 -right-10 w-3 h-3 bg-sky-400 rounded-full animate-ping" />
                <div className="absolute bottom-10 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            </div>
        </div>
    );
};

export default NotFound;