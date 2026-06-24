import React from 'react';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';
import logoPng from '@/images/logo.png'

const SidebarHeader = () => (
    <div className="flex justify-between items-center pb-5 mb-3 border-b border-default w-full">
        <Link href="/" className="flex items-center gap-2">
            <Image
                src={logoPng}
                alt="PromptWorld Logo"
                width={24}
                height={24}
                className="object-contain"
            />
            <span className="text-lg font-bold text-blue-900 dark:text-blue-400 tracking-wide leading-none">
                Prompt World
            </span>
        </Link>
        <ThemeToggle />
    </div>
);

export default SidebarHeader;