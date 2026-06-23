import { getCreatorPromptBookmarks } from "@/lib/api/bookmarks";
import { FiArrowRight, FiBookmark, FiCalendar, FiMail, FiUser } from "react-icons/fi";

export default async function CreatorBookmarksDashboard() {
    const bookmarks = await getCreatorPromptBookmarks();

    if (bookmarks.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full border border-dashed border-blue-500/30 dark:border-blue-300 flex items-center justify-center text-blue-500/50 mb-4 animate-pulse">
                    <FiBookmark size={28} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">Registry Is Empty</h3>
                <p className="text-sm text-zinc-500 max-w-sm mt-1 leading-relaxed">
                    No one has bookmarked your creative prompts yet! Keep publishing to gather platform interactions.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">

            {/* Header Section */}
            <div className="relative border-b border-blue-500/10 dark:border-blue-300 pb-6">
                {/* Decorative subtle ambient blue glow trail */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -z-10 pointer-events-none" />

                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl border border-blue-500/20 text-blue-500 shadow-sm shadow-blue-500/10">
                        <FiBookmark size={22} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 bg-clip-text bg-linear-to-r from-zinc-900 via-blue-900 to-blue-600 dark:from-white dark:via-zinc-200 dark:to-blue-400">
                            Prompt Bookmarks Registry
                        </h2>
                        <p className="text-xs font-medium text-blue-500/70 tracking-wider uppercase mt-0.5">
                            Real-time Platform Interaction Metrics • {bookmarks.length} Saves
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {bookmarks.map((bookmark) => (
                    <div
                        key={bookmark.bookmarkId}
                        className="group border border-blue-500/10 dark:border-blue-300 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-blue-500/30 dark:border-blue-300 transition-all duration-300"
                    >
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-blue-500/70 tracking-wider uppercase inline-flex items-center gap-1">
                                <FiBookmark size={10} /> Saved Item
                            </span>
                            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors line-clamp-2">
                                {bookmark.promptTitle}
                            </h4>
                        </div>

                        <div className="pt-3 border-t border-blue-500/5 space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                                <FiUser size={13} className="text-blue-500/50" />
                                <span className="font-medium">{bookmark.bookmarkedByName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono">
                                <FiMail size={13} className="text-blue-500/50" />
                                <span className="truncate">{bookmark.bookmarkedByEmail}</span>
                            </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-500">
                            <span className="inline-flex items-center gap-1">
                                <FiCalendar size={12} />
                                {new Date(bookmark.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                            <FiArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-500 transition-all duration-300" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Area (Maintained with completely transparent containers) */}
            <div className="hidden md:block overflow-x-auto border border-blue-500/10 dark:border-blue-300 rounded-2xl backdrop-blur-sm">
                <table className="min-w-full divide-y divide-blue-500/10 text-sm">
                    <thead>
                        <tr className="border-b border-blue-500/10 dark:border-blue-300">
                            <th className="px-6 py-4 font-semibold text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 text-left">
                                Prompt Title
                            </th>
                            <th className="px-6 py-4 font-semibold text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 text-left">
                                <span className="inline-flex items-center gap-1.5"><FiUser size={12} /> Bookmarked By</span>
                            </th>
                            <th className="px-6 py-4 font-semibold text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 text-left">
                                <span className="inline-flex items-center gap-1.5"><FiMail size={12} /> User Email</span>
                            </th>
                            <th className="px-6 py-4 font-semibold text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 text-right">
                                <span className="inline-flex items-center gap-1.5 justify-end w-full"><FiCalendar size={12} /> Saved Date</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-blue-500/5 dark:divide-blue-800/30">
                        {bookmarks.map((bookmark) => (
                            <tr
                                key={bookmark.bookmarkId}
                                className="group hover:bg-blue-500/2 dark:hover:bg-blue-400/2 transition-colors duration-200"
                            >
                                <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100 max-w-xs sm:max-w-md truncate group-hover:text-blue-500 transition-colors">
                                    {bookmark.promptTitle}
                                </td>
                                <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300 font-medium">
                                    {bookmark.bookmarkedByName}
                                </td>
                                <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                                    {bookmark.bookmarkedByEmail}
                                </td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 font-medium text-right text-xs">
                                    {new Date(bookmark.date).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}