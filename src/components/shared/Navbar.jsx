"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import logoPng from "../../../public/images/logo.png";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "All Prompts",
            href: "/prompts",
        },
    ];

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

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 transition hover:text-blue-700 dark:hover:text-blue-500"
                        >
                            Login
                        </Link>

                        <Link href="/register">
                            <Button
                                radius="lg"
                                className="h-11 bg-blue-600 dark:bg-blue-100 px-6 text-sm font-semibold text-white dark:text-blue-700 hover:bg-blue-700 shadow-md shadow-blue-200"
                            >
                                Get Started
                            </Button>
                        </Link>
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
                        {/* Navigation Links */}
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="block rounded-xl px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-200 transition hover:bg-blue-50/50 dark:hover:bg-blue-50/50 hover:text-blue-600 dark:hover:text-blue-800"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="border-t border-blue-50 pt-4">
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/login"
                                    className="rounded-xl px-4 py-3 text-center text-base font-medium text-blue-600 transition hover:bg-blue-50/50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>

                                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                    <Button
                                        radius="lg"
                                        className="h-11 w-full bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}