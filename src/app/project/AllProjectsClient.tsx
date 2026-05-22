"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuArrowUpRight, LuEye, LuTag } from "react-icons/lu";
import projectsData from "@/app/data/projectsData.json";

export default function AllProjectsClient() {
    const categories = ["Semua", "AI/Data/ML", "Web", "Mobile"];
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const filteredProjects = selectedCategory === "Semua" 
        ? projectsData 
        : projectsData.filter(p => p.category === selectedCategory);

    return (
        <main className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
            {/* Soft background glow */}
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>

            {/* Breadcrumbs */}
            <div className="flex items-center justify-between gap-4 mb-8 text-sm" data-aos="fade-up">
                <nav className="flex items-center space-x-2 text-gray-400">
                    <Link href="/" className="hover:text-teal-400 font-medium transition-colors">Beranda</Link>
                    <span className="text-gray-600">/</span>
                    <span className="text-white font-semibold">Semua Proyek</span>
                </nav>
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-teal-400 transition-all bg-gray-900/60 hover:bg-gray-800/80 px-4 py-2.5 rounded-xl border border-gray-800/80 shadow-md group"
                >
                    <LuArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Beranda
                </Link>
            </div>

            {/* Header Title */}
            <div className="flex flex-col items-start mb-12" data-aos="fade-up">
                <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">Portofolio Lengkap</span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display mt-2 text-white bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                    Semua Proyek Portofolio
                </h1>
                <p className="text-gray-300 mt-4 max-w-2xl leading-relaxed text-sm md:text-base font-medium">
                    Jelajahi seluruh karya, proyek penelitian AI/ML, aplikasi web skala penuh, dan aplikasi mobile yang telah saya kembangkan.
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-6 rounded-full"></div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3 mb-10" data-aos="fade-up">
                {categories.map((cat, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 ${
                            selectedCategory === cat
                                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/10"
                                : "border border-gray-800 bg-gray-900/40 text-gray-300 hover:border-teal-500 hover:text-teal-400"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid of Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="100">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <article 
                            key={project.slug} 
                            className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 hover:-translate-y-1 border border-gray-805"
                        >
                            <div>
                                {/* Project Image and Hover Eye Overlay */}
                                <div className="relative w-full h-48 overflow-hidden bg-gray-800">
                                    <Image 
                                        src={project.image} 
                                        alt={project.title} 
                                        fill 
                                        style={{ objectFit: "cover" }}
                                        className="group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                        <Link 
                                            href={`/project/${project.slug}`}
                                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-gray-900 shadow-lg hover:scale-110 transition-transform cursor-pointer"
                                            aria-label="Tinjau detail proyek"
                                        >
                                            <LuEye size={20} />
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* Text Info */}
                                <div className="p-6 space-y-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 uppercase tracking-wide border border-teal-500/10">
                                        <LuTag size={10} />
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white font-display line-clamp-1 hover:text-teal-400 transition-colors cursor-pointer">
                                        <Link href={`/project/${project.slug}`}>
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed font-normal">
                                        {project.summary}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 pt-0 flex justify-between items-center">
                                <span className="text-xs text-gray-400 font-medium font-mono">{project.date}</span>
                                <Link 
                                    href={`/project/${project.slug}`}
                                    className="text-sm font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer transition-colors group/btn"
                                >
                                    Detail Proyek
                                    <LuArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-gray-500/5 rounded-2xl border border-dashed border-gray-805">
                        <p className="text-gray-400 font-medium">Tidak ada proyek dalam kategori ini.</p>
                    </div>
                )}
            </div>

            {/* Back CTA Button */}
            <div className="flex justify-center mt-16" data-aos="fade-up">
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 border border-gray-800 hover:border-teal-500 bg-gray-900/40 text-gray-300 hover:text-teal-400 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-md cursor-pointer"
                >
                    <LuArrowLeft size={16} />
                    Kembali Ke Beranda
                </Link>
            </div>
        </main>
    );
}
