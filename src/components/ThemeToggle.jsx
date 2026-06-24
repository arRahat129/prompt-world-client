"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle({
    isIconOnly = true,
    className = "",
    variant = "light"
}) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "light";
        }
        return "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

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