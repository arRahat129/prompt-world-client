"use client";

import React from "react";
import { Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

const SidebarLinks = ({ user }) => {
    const pathname = usePathname();

    const userNavlinks = [
        { icon: House, href: "/", label: "Home" },
        { icon: Envelope, href: `/dashboard/${user?.role}`, label: "Dashboard" },
        { icon: FaPlus, href: `/dashboard/${user?.role}/my-prompts/add-prompts`, label: "Add Prompt" },
        { icon: Magnifier, href: `/dashboard/${user?.role}/my-prompts`, label: "My Prompts" },
        { icon: Gear, href: `/dashboard/${user?.role}/my-bookmarks`, label: "Saved Prompts" },
        { icon: Bell, href: `/dashboard/${user?.role}/my-reviews`, label: "My Reviews" },
        { icon: Person, href: `/dashboard/${user?.role}/my-profile`, label: "Profile" },
    ];
    
    const creatorNavlinks = [
        { icon: House, href: "/", label: "Home" },
        { icon: Envelope, href: `/dashboard/${user?.role}`, label: "Creator Home" },
        { icon: FaPlus, href: `/dashboard/${user?.role}/my-prompts/add-prompts`, label: "Add Prompt" },
        { icon: Magnifier, href: `/dashboard/${user?.role}/my-prompts`, label: "My Prompts" },
        { icon: Gear, href: `/dashboard/${user?.role}/bookmarks`, label: "Bookmarks" },
    ];

    const adminNavlinks = [
        { icon: House, href: "/", label: "Home" },
        { icon: Envelope, href: `/dashboard/${user?.role}`, label: "Analytics" },
        { icon: Person, href: `/dashboard/${user?.role}/all-users`, label: "All Users" },
        { icon: Magnifier, href: `/dashboard/${user?.role}/all-prompts`, label: "All Prompts" },
        { icon: Gear, href: `/dashboard/${user?.role}/all-payments`, label: "All Payments" },
        { icon: Bell, href: `/dashboard/${user?.role}/reports`, label: "Reported Prompts" },
    ];

    const navLinksMap = {
        user: userNavlinks,
        creator: creatorNavlinks,
        admin: adminNavlinks
    }

    const navItems = navLinksMap[user?.role || 'user'];

    return (
        <div className="w-full flex flex-col gap-1">
            {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <Link href={item.href} key={item.label} className="w-full">
                        <button
                            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer group
                                ${isActive
                                    ? "bg-blue-600/10 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                                    : "text-foreground hover:bg-default"
                                }`}
                        >
                            <item.icon
                                className={`size-5 transition-colors
                                    ${isActive
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-muted group-hover:text-foreground"
                                    }`}
                            />
                            {item.label}
                        </button>
                    </Link>
                );
            })}
        </div>
    );
};

export default SidebarLinks;