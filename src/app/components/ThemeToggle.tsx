"use client";

import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const html = document.documentElement;
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme === "dark" || (!storedTheme && !html.classList.contains("light"))) {
            html.classList.add("dark");
            setIsDark(true);
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark");
            setIsDark(false);
            localStorage.setItem("theme", "light");
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

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-teal-600 dark:hover:text-teal-400 hover:scale-105 transition-all duration-300 shadow-sm cursor-pointer overflow-hidden group"
            type="button"
        >
            <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`absolute transition-all duration-500 transform ${isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`}>
                    <LuSun size={20} className="text-amber-400" />
                </span>
                <span className={`absolute transition-all duration-500 transform ${isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
                    <LuMoon size={18} className="text-teal-600" />
                </span>
            </div>
        </button>
    );
}
