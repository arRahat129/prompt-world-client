import React from 'react';
import Link from 'next/link';
import logoPng from "../../../public/images/logo.png";
import { Button, Input } from '@heroui/react';
import Image from 'next/image';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Product",
            links: [
                { label: "Discover Prompts", href: "/prompts" },
                { label: "Features", href: "/#features" },
                { label: "Pricing", href: "/pricing" },
            ]
        },
        {
            title: "Community",
            links: [
                { label: "Creators Hub", href: "/creators" },
                { label: "Discord Server", href: "https://discord.gg" },
                { label: "Discussion Forum", href: "/forum" },
            ]
        },
        {
            title: "Company",
            links: [
                { label: "About Us", href: "/about" },
                { label: "Contact Sales", href: "/contact" },
                { label: "Careers", href: "/careers" },
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Licensing", href: "/licensing" },
            ]
        }
    ];

    return (
        /* Styled footer using matching background and borders from your Navbar configuration */
        <footer className="w-full border-t border-blue-50 dark:border-blue-900 bg-white dark:bg-black/80 backdrop-blur-xl mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

                {/* TOP GRID SECTION */}
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-8">

                    {/* BRAND & NEWSLETTER COLUMN */}
                    <div className="space-y-6 xl:col-span-1">
                        {/* LOGO & BRAND NAME PERFECTLY ALIGNED */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <Image
                                src={logoPng}
                                alt="PromptWorld Logo"
                                width={40} // Scaled to look elegant in the footer
                                height={40}
                                className="object-contain transition-transform group-hover:scale-105"
                            />
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-blue-900 dark:text-blue-400 tracking-wide">
                                    Prompt World
                                </span>
                            </div>
                        </Link>
                        <p className="max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            The global marketplace for premium artificial intelligence engineering. Discover, share, and monetize highly curated workflows and prompt blocks.
                        </p>

                        {/* Newsletter Input */}
                        <div className="max-w-md space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Subscribe to prompt drops
                            </h4>
                            <div className="flex flex-col sm:flex-row gap-2 max-w-sm">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    size="sm"
                                    radius="lg"
                                    variant="bordered"
                                    // Drop classNames object completely and use single standard className string
                                    className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-800 rounded-xl text-slate-600 dark:text-white"
                                />
                                <Button
                                    size="sm"
                                    radius="lg"
                                    className="bg-blue-600 dark:bg-blue-100 font-medium text-white dark:text-blue-700 hover:bg-blue-700 dark:hover:bg-blue-200 shadow-sm px-4"
                                >
                                    Join
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* LINKS COLUMNS */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 xl:col-span-2">
                        {footerSections.map((section) => (
                            <div key={section.title} className="space-y-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-900 dark:text-blue-400">
                                    {section.title}
                                </h3>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-slate-500 dark:text-slate-400 transition duration-150 hover:text-blue-600 dark:hover:text-blue-300"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                {/* BOTTOM LEGAL SECTION */}
                <div className="mt-12 border-t border-blue-50 dark:border-blue-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        &copy; {currentYear} Prompt World. All rights reserved.
                    </p>

                    <div className="flex space-x-6 text-xs text-slate-400 dark:text-slate-500">
                        <span>Built with HeroUI & Next.js</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;