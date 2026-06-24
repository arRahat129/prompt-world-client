"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle({
    isIconOnly = true,
    className = "",
    variant = "light"
}) {
    const [theme, setTheme] = useState("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        const frameId = requestAnimationFrame(() => {
            if (savedTheme && savedTheme !== "light") {
                setTheme(savedTheme);
            }
            setMounted(true);
        });

        return () => cancelAnimationFrame(frameId);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    if (!mounted) {
        return (
            <Button
                isIconOnly={isIconOnly}
                variant={variant}
                className={className}
            >
                <div className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <Button
            isIconOnly={isIconOnly}
            variant={variant}
            onPress={toggleTheme}
            className={className}
        >
            {theme === "light" ? (
                <FaMoon className="h-5 w-5" />
            ) : (
                <FaSun className="h-5 w-5" />
            )}
        </Button>
    );
}