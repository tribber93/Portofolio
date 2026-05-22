"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skill", label: "Skills" },
    { id: "proyek", label: "Projects" },
    { id: "history", label: "History" },
    { id: "sertifikat", label: "Certificates" },
    { id: "contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (isHome) {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setActiveSection(id);
                setIsOpen(false);
            }
        } else {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
        );

        window.addEventListener("scroll", handleScroll);

        sections.forEach(({ id }) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
                ? "bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-md shadow-sm border-b border-gray-200/30 dark:border-gray-800/30 py-3" 
                : "bg-transparent py-5"
        }`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link 
                    href={isHome ? "#hero" : "/#hero"} 
                    onClick={(e) => handleScrollTo(e, "hero")}
                    className="text-xl md:text-2xl font-bold tracking-tight font-display hover:opacity-90 transition-opacity"
                >
                    <span className="gradient-text">Yoni</span><span className="text-gray-900 dark:text-white">.T</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-1">
                    {sections.map(({ id, label }) => (
                        <Link
                            key={id}
                            href={isHome ? `#${id}` : `/#${id}`}
                            onClick={(e) => handleScrollTo(e, id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                                activeSection === id
                                    ? "text-teal-600 dark:text-teal-400 font-semibold"
                                    : "text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                            }`}
                        >
                            {label}
                            {activeSection === id && (
                                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex flex-col justify-between w-6 h-5 md:hidden cursor-pointer focus:outline-none"
                        aria-label="Toggle navigation menu"
                    >
                        <span className={`h-0.5 w-full bg-gray-700 dark:bg-gray-300 rounded-full transition-transform duration-300 origin-left ${isOpen ? "rotate-45 translate-x-1 -translate-y-0.5" : ""}`}></span>
                        <span className={`h-0.5 w-full bg-gray-700 dark:bg-gray-300 rounded-full transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
                        <span className={`h-0.5 w-full bg-gray-700 dark:bg-gray-300 rounded-full transition-transform duration-300 origin-left ${isOpen ? "-rotate-45 translate-x-1 translate-y-0.5" : ""}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 right-0 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-lg transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 py-0"
            }`}>
                <nav className="flex flex-col px-6 space-y-4">
                    {sections.map(({ id, label }) => (
                        <Link
                            key={id}
                            href={isHome ? `#${id}` : `/#${id}`}
                            onClick={(e) => handleScrollTo(e, id)}
                            className={`py-2 text-base font-medium transition-colors duration-300 ${
                                activeSection === id
                                    ? "text-teal-600 dark:text-teal-400 font-semibold pl-2 border-l-2 border-teal-500"
                                    : "text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
