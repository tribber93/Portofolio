"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Cek class 'dark' pada <html> saat mount
        const html = document.documentElement;
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme === "dark" || (!storedTheme && html.classList.contains("dark"))) {
            html.classList.add("dark");
            setIsDark(true);
        } else {
            html.classList.remove("dark");
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    console.log(isDark)

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="text-xl"
            type="button"
        >
            {isDark ? "☀️" : "🌙"}
        </button>
    );
}
