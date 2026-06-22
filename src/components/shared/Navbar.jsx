"use client";

import Link from "next/link";
import { Avatar, Button, Dropdown, Skeleton } from "@heroui/react";
import logoPng from "@/images/logo.png";
import Image from "next/image";
import { useState } from "react";
import { authClient, signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const { data: session, isPending } = useSession();
    // console.log("watch the outputs", {session, isPending});

    const user = session?.user;
    // console.log(user);

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/signin");
                    router.refresh();
                }
            }
        });
    };

    const navLinks = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "All Prompts",
            href: "/prompts",
        },
        {
            label: "Plans",
            href:"/plans"
        }
    ];

    const dashboardLinks = {
        user: '/dashboard/user',
        creator: '/dashboard/creator',
        admin: '/dashboard/admin'
    }

    return (
        /* Lightened background with a soft blue backdrop blur and border */
        <nav className="sticky top-0 z-50 border-b border-blue-50 bg-white dark:bg-black/150 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* LOGO & BRAND */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={logoPng}
                        alt="PromptWorld Logo"
                        width={25}
                        height={25}
                        className="object-contain"
                    />
                    <div className="hidden leading-none sm:block">
                        <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-400 tracking-wide">
                            Prompt World
                        </h1>
                    </div>
                </Link>

                {/* RIGHT SIDE (NAVIGATION & ACTIONS) */}
                <div className="flex items-center gap-4 md:gap-6">

                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50/50 dark:bg-black/150 px-3 py-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 dark:text-white transition hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm shadow-transparent hover:shadow-blue-50/50 dark:hover:shadow-blue-900"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Vertical Divider (Desktop Only) */}
                    <div className="hidden md:block h-6 w-px bg-slate-200 dark:bg-slate-600" />

                    {/* Desktop Action Buttons / Auth State */}
                    <div className="hidden md:flex items-center gap-4">
                        {isPending ? (
                            <Skeleton className="flex h-10 w-10 rounded-full" />
                        ) : !user ? (
                            <>
                                <Link
                                    href="/auth/signin"
                                    className="text-sm font-medium text-blue-600 dark:text-blue-400 transition hover:text-blue-700 dark:hover:text-blue-500"
                                >
                                    Login
                                </Link>
                                <Link href="/auth/signup">
                                    <Button
                                        radius="lg"
                                        className="h-11 bg-blue-600 dark:bg-blue-100 px-6 text-sm font-semibold text-white dark:text-blue-700 hover:bg-blue-700 shadow-md shadow-blue-200"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div className="flex items-center gap-3 text-left cursor-pointer rounded-xl p-1 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
                                        <Avatar className="h-10 w-10">
                                            <Avatar.Image
                                                alt={user.name || "User Avatar"}
                                                src={user.image || ""}
                                                referrerPolicy="no-referrer"
                                            />
                                            <Avatar.Fallback>
                                                {user.name ? user.name[0].toUpperCase() : "U"}
                                            </Avatar.Fallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 max-w-28 truncate leading-tight">
                                                {user.name}
                                            </span>
                                            <span className="text-xs text-slate-400 dark:text-slate-500 max-w-28 truncate leading-none mt-0.5">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </Dropdown.Trigger>
                                <Dropdown.Popover>
                                    <Dropdown.Menu aria-label="User contextual menu items">
                                        <Dropdown.Item key="dashboard" textValue="Dashboard">
                                            <Link href={dashboardLinks[user?.role || 'user']} className="block w-full text-sm font-medium text-slate-700 dark:text-slate-200">
                                                Dashboard
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item key="logout" textValue="Logout" variant="danger" onClick={handleSignOut}>
                                            <span className="text-sm font-medium">Log Out</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center justify-center rounded-lg p-2 text-blue-900 dark:text-blue-400 transition hover:bg-blue-50 md:hidden"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* MOBILE DROPDOWN MENU */}
            {isMenuOpen && (
                <div className="border-t border-blue-50 dark:border-blue-800 bg-white dark:bg-gray-900 md:hidden">
                    <div className="space-y-3 px-4 py-6">
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="block rounded-xl px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-200 transition hover:bg-blue-50/50 hover:text-blue-600"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-blue-50 pt-4 dark:border-blue-800">
                            <div className="flex flex-col gap-3">
                                {isPending ? (
                                    <Skeleton className="h-11 w-full rounded-xl" />
                                ) : !user ? (
                                    <>
                                        <Link
                                            href="/auth/signin"
                                            className="rounded-xl px-4 py-3 text-center text-base font-medium text-blue-600 transition hover:bg-blue-50/50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                                            <Button
                                                radius="lg"
                                                className="h-11 w-full bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                                            >
                                                Get Started
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Dropdown className="w-full">
                                        <Dropdown.Trigger>
                                            <div className="flex w-full items-center justify-between text-left bg-slate-50 dark:bg-gray-800/50 p-3 rounded-xl cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <Avatar.Image
                                                            alt={user.name || "User Avatar"}
                                                            src={user.image || ""}
                                                            referrerPolicy="no-referrer"
                                                        />
                                                        <Avatar.Fallback>
                                                            {user.name ? user.name[0].toUpperCase() : "U"}
                                                        </Avatar.Fallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[180px]">
                                                            {user.name}
                                                        </span>
                                                        <span className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[180px]">
                                                            {user.email}
                                                        </span>
                                                    </div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </Dropdown.Trigger>
                                        <Dropdown.Popover className="w-[calc(100vw-32px)]">
                                            <Dropdown.Menu aria-label="Mobile User menu selections">
                                                <Dropdown.Item key="dashboard" textValue="Dashboard">
                                                    <Link
                                                        href={dashboardLinks[user?.role || 'user']}
                                                        className="block w-full text-base font-medium text-slate-700 dark:text-slate-200"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item key="logout" textValue="Logout" variant="danger" onClick={() => { handleSignOut(); setIsMenuOpen(false); }}>
                                                    <span className="text-base font-medium">Log Out</span>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </Dropdown>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}