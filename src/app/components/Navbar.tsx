"use client";

import { useEffect, useState } from "react";
// import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    const sections = [
        { id: "hero", label: "Beranda" },
        { id: "pengalaman", label: "Pengalaman" },
        { id: "pendidikan", label: "Pendidikan" },
        { id: "organisasi", label: "Organisasi" },
        { id: "proyek", label: "Proyek" },
        { id: "sertifikat", label: "Sertifikat" },
        { id: "skill", label: "Skill" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sections.forEach(({ id }) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Yoni Tribber
                    </span>
                </a>

                <div className="flex items-center md:order-2 gap-2">
                    {/* <ThemeToggle /> */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
                        aria-label="Toggle navigation"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    className={`${isOpen ? "block" : "hidden"
                        } w-full md:flex md:w-auto md:order-1`}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {sections.map(({ id, label }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={`block py-2 px-3 rounded-sm md:p-0 transition-colors duration-300
                    ${activeSection === id
                                            ? "text-white bg-teal-700 md:bg-transparent md:text-teal-700 md:dark:text-teal-500"
                                            : "text-gray-900 dark:text-white hover:text-teal-700 dark:hover:text-teal-400"
                                        }`}
                                    aria-current={activeSection === id ? "page" : undefined}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
