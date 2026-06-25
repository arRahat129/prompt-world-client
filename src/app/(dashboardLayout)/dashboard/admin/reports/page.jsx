import { getReportsAll } from "@/lib/api/reports";
import Link from "next/link";

const Reports = async ({ searchParams }) => {
    const resolvedParams = await searchParams;

    const currentPage = parseInt(resolvedParams?.page || "1", 10);
    const itemsPerPage = 10;

    const data = await getReportsAll({
        page: currentPage,
        perPage: itemsPerPage,
    });

    const reportsList = data?.reports || [];
    const totalRecords = data?.total || 0;
    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* HEADER */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-blue-100 dark:border-slate-800 p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                                Reports Management
                            </h1>

                            <p className="text-slate-500 dark:text-slate-400 mt-2">
                                Review community reports and moderation requests.
                            </p>
                        </div>

                        <div className="bg-blue-600 dark:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow">
                            <p className="text-xs uppercase tracking-widest opacity-80">
                                Total Reports
                            </p>

                            <p className="text-2xl font-bold">
                                {totalRecords}
                            </p>
                        </div>
                    </div>
                </div>

                {/* EMPTY STATE */}
                {reportsList.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-blue-100 dark:border-slate-800 p-16 text-center">
                        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                            No Reports Found
                        </h2>

                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            The platform currently has no reported content.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* DESKTOP TABLE */}
                        <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden border border-blue-100 dark:border-slate-800">

                            <table className="w-full">
                                <thead className="bg-blue-600 dark:bg-slate-800 text-white">
                                    <tr>
                                        <th className="px-5 py-4 text-left">Prompt</th>
                                        <th className="px-5 py-4 text-left">Report Type</th>
                                        <th className="px-5 py-4 text-left">Reporter</th>
                                        <th className="px-5 py-4 text-left">Reason</th>
                                        <th className="px-5 py-4 text-left">Reported At</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reportsList.map((report) => (
                                        <tr
                                            key={report._id}
                                            className="border-b border-slate-100 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-slate-800/50 transition"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={report.promptThumbnail}
                                                        alt={report.promptTitle}
                                                        className="w-14 h-14 rounded-lg object-cover"
                                                    />

                                                    <div>
                                                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                                                            {report.promptTitle}
                                                        </h3>

                                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                                            {report.promptCategory}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300 px-3 py-1 rounded-full text-xs font-semibold">
                                                    {report.reportType}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={report.reporterImage}
                                                        alt={report.reporterName}
                                                        className="w-9 h-9 rounded-full"
                                                    />

                                                    <div>
                                                        <p className="font-medium text-slate-700 dark:text-slate-200">
                                                            {report.reporterName}
                                                        </p>

                                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                                            {report.reporterEmail}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 max-w-md">
                                                <p className="line-clamp-2 text-slate-600 dark:text-slate-300">
                                                    {report.reason}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                {new Date(report.reportedAt).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* MOBILE CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
                            {reportsList.map((report) => (
                                <div
                                    key={report._id}
                                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-blue-100 dark:border-slate-800 overflow-hidden"
                                >
                                    <img
                                        src={report.promptThumbnail}
                                        alt={report.promptTitle}
                                        className="h-48 w-full object-cover"
                                    />

                                    <div className="p-5 space-y-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                                                {report.promptTitle}
                                            </h3>

                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {report.promptCategory}
                                            </p>
                                        </div>

                                        <span className="inline-block bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300 px-3 py-1 rounded-full text-xs font-semibold">
                                            {report.reportType}
                                        </span>

                                        <p className="text-sm text-slate-600 dark:text-slate-300">
                                            {report.reason}
                                        </p>

                                        <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                                            <img
                                                src={report.reporterImage}
                                                alt={report.reporterName}
                                                className="w-10 h-10 rounded-full"
                                            />

                                            <div>
                                                <p className="font-medium text-slate-700 dark:text-slate-200">
                                                    {report.reporterName}
                                                </p>

                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {report.reporterEmail}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-xs text-slate-400">
                                            {new Date(report.reportedAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl shadow border border-blue-100 dark:border-slate-800">
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    Page <strong>{currentPage}</strong> of{" "}
                                    <strong>{totalPages}</strong>
                                </p>

                                <div className="flex gap-3">
                                    <Link
                                        href={`?page=${Math.max(currentPage - 1, 1)}`}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                                                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 pointer-events-none"
                                                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
                                            }`}
                                    >
                                        Previous
                                    </Link>

                                    <Link
                                        href={`?page=${Math.min(currentPage + 1, totalPages)}`}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage >= totalPages
                                                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 pointer-events-none"
                                                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
                                            }`}
                                    >
                                        Next
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Reports;