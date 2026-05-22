"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            setWidth(scrolled);
        };

        // Listen for scroll events
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        // Initial call in case the user loads/refreshes the page already scrolled
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-400 z-50 transition-all duration-75 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
            style={{ width: `${width}%` }}
        />
    );
}
