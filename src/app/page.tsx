"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { 
    LuArrowUpRight, 
    LuGithub, 
    LuLinkedin, 
    LuCode, 
    LuZap, 
    LuCpu, 
    LuLayoutGrid, 
    LuDatabase, 
    LuEye, 
    LuX, 
    LuMail, 
    LuMapPin, 
    LuPhone, 
    LuSend, 
    LuCircleCheck,
    LuArrowUp,
    LuExternalLink
} from "react-icons/lu";

import {
    SiPython,
    SiTensorflow,
    SiPytorch,
    SiDocker,
    SiGit,
    SiPhp,
    SiJavascript,
    SiFlutter,
    SiScikitlearn,
    SiHuggingface,
    SiFastapi,
    SiGooglegemini
} from "react-icons/si";

import myData from "@/app/data/myData.json";
import projectsData from "@/app/data/projectsData.json";

interface Project {
    title: string;
    category: string;
    image: string;
    date: string;
    summary: string;
    content: string;
    slug: string;
}

const roles = ["Data Scientist", "Machine Learning Engineer", "AI Developer"];

export default function Home() {
    // Typing Animation
    const [roleIndex, setRoleIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        if (subIndex === roles[roleIndex].length + 1 && !isDeleting) {
            const timeout = setTimeout(() => setIsDeleting(true), 1500);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && isDeleting) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        const timeout = setTimeout(() => {
            setTypedText(roles[roleIndex].substring(0, subIndex + (isDeleting ? -1 : 1)));
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [subIndex, isDeleting, roleIndex]);

    // Scroll to Top visibility
    const [showScrollTop, setShowScrollTop] = useState(false);
    useEffect(() => {
        const handleScrollVisibility = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener("scroll", handleScrollVisibility);
        return () => window.removeEventListener("scroll", handleScrollVisibility);
    }, []);

    // Project filtering
    const categories = ["Semua", "AI/Data/ML", "Web", "Mobile"];
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const filteredProjects = selectedCategory === "Semua" 
        ? projectsData 
        : projectsData.filter(p => p.category === selectedCategory);

    // Modal details
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalContent, setModalContent] = useState("");
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        if (!selectedProject) return;
        setModalLoading(true);
        fetch(selectedProject.content)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load markdown content");
                return res.text();
            })
            .then((text) => {
                setModalContent(text);
                setModalLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setModalContent("Konten tidak tersedia untuk saat ini.");
                setModalLoading(false);
            });
    }, [selectedProject]);

    // Form inputs and validation
    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formSubject, setFormSubject] = useState("");
    const [formMessage, setFormMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [toast, setToast] = useState({
        show: false,
        message: ""
    });

    const triggerToast = (msg: string) => {
        setToast({ show: true, message: msg });
        setTimeout(() => {
            setToast({ show: false, message: "" });
        }, 4000);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { name: "", email: "", subject: "", message: "" };

        if (!formName.trim()) {
            newErrors.name = "Nama lengkap harus diisi.";
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formEmail.trim()) {
            newErrors.email = "Alamat email harus diisi.";
            valid = false;
        } else if (!emailRegex.test(formEmail)) {
            newErrors.email = "Format email tidak valid.";
            valid = false;
        }

        if (!formSubject.trim()) {
            newErrors.subject = "Subjek pesan harus diisi.";
            valid = false;
        }

        if (!formMessage.trim()) {
            newErrors.message = "Isi pesan tidak boleh kosong.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API sending
        setTimeout(() => {
            setIsSubmitting(false);
            setFormName("");
            setFormEmail("");
            setFormSubject("");
            setFormMessage("");
            triggerToast("Pesan Anda telah berhasil terkirim!");
        }, 1500);
    };

    // Skills custom listing with progress representation
    const skillsList = [
        {
            category: "Machine Learning & AI",
            icon: <LuCpu className="w-5 h-5 text-teal-500" />,
            skills: [
                { name: "Python", percent: 95, icon: <SiPython /> },
                { name: "TensorFlow", percent: 90, icon: <SiTensorflow /> },
                { name: "PyTorch", percent: 85, icon: <SiPytorch /> },
                { name: "Keras & scikit-learn", percent: 88, icon: <SiScikitlearn /> },
                { name: "LLMs (OpenAI & Gemini)", percent: 90, icon: <SiGooglegemini /> },
                { name: "NLP & Hugging Face", percent: 85, icon: <SiHuggingface /> }
            ]
        },
        {
            category: "Backend & Deployment",
            icon: <LuDatabase className="w-5 h-5 text-teal-500" />,
            skills: [
                { name: "FastAPI & Django", percent: 88, icon: <SiFastapi /> },
                { name: "PHP (Laravel)", percent: 80, icon: <SiPhp /> },
                { name: "Docker", percent: 75, icon: <SiDocker /> },
                { name: "Git & Workflows", percent: 90, icon: <SiGit /> }
            ]
        },
        {
            category: "Frontend & Mobile",
            icon: <LuLayoutGrid className="w-5 h-5 text-teal-500" />,
            skills: [
                { name: "JavaScript (ES6+)", percent: 85, icon: <SiJavascript /> },
                { name: "React & Next.js", percent: 80, icon: <SiJavascript /> },
                { name: "Flutter", percent: 78, icon: <SiFlutter /> }
            ]
        }
    ];

    // Consolidated Education + Experience Timeline Data
    const timelineData = [
        {
            type: "work",
            title: "Machine Learning Engineer Intern",
            subtitle: "PT. Inti Utama Solusindo (Pharos Group)",
            date: "Agu 2023 - Des 2023",
            description: [
                "Mengembangkan chatbot cerdas RAG berbasis Django & Langchain menggunakan jurnal kesehatan terpercaya.",
                "Mengekstrak dan menyusun knowledge base terstruktur dari jurnal open-access.",
                "Mengoptimalkan query basis data relasional PostgreSQL untuk performa pencarian chatbot.",
                "Bekerja bersama tim medis untuk melakukan evaluasi performa model LLM."
            ]
        },
        {
            type: "education",
            title: "Bachelor of Informatics Engineering",
            subtitle: "Universitas Catur Insan Cendekia",
            date: "2020 - 2024",
            description: [
                "Lulus dengan pujian (Honors). IPK Akhir: 3.81 / 4.00.",
                "Menerima penghargaan Skripsi Terbaik program studi Teknik Informatika dengan fokus riset AI RAG.",
                "Aktif dalam organisasi kemahasiswaan dan kompetisi pengembangan teknologi."
            ]
        },
        {
            type: "work",
            title: "Machine Learning Cohort",
            subtitle: "Bangkit Academy (Google, GoTo, Traveloka)",
            date: "Jan 2023 - Jul 2023",
            description: [
                "Menyelesaikan kurikulum intensif Machine Learning: TensorFlow, Deep Learning, dan Cloud Computing.",
                "Membangun proyek capstone rekomendasi kuesioner cerdas (Quisiin) dengan deep learning.",
                "Lulus sertifikasi TensorFlow Developer Certificate dari Google."
            ]
        },
        {
            type: "org",
            title: "Vice Head of Research & Development Division",
            subtitle: "HIMATIF Universitas Catur Insan Cendekia",
            date: "2022",
            description: [
                "Memimpin dan merancang strategi program kerja riset serta pelatihan teknologi mahasiswa.",
                "Menyelenggarakan workshop pengembangan web dasar dan machine learning dasar untuk anggota."
            ]
        },
        {
            type: "education",
            title: "Senior High School (IPA)",
            subtitle: "SMA Negeri 1 Beber",
            date: "2015 - 2018",
            description: [
                "Jurusan Matematika dan Ilmu Pengetahuan Alam (MIPA)."
            ]
        }
    ];

    return (
        <div className="relative min-h-screen">
            {/* Hero Section */}
            <section id="hero" className="min-h-screen flex items-center pt-28 md:pt-0 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column Text */}
                    <div className="md:col-span-7 flex flex-col items-start text-left space-y-6" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                            Tersedia untuk AI & ML Opportunities
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight tracking-tight text-gray-900 dark:text-white">
                            Designing & Building <br />
                            <span className="gradient-text">Intelligent AI Solutions</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-sans max-w-2xl">
                            Halo, saya <strong className="text-teal-600 dark:text-teal-400 font-bold">{myData.name}</strong>, seorang <span className="text-gray-900 dark:text-white font-semibold font-mono">{typedText}</span><span className="typed-cursor">|</span> yang memadukan keahlian analitik data dengan implementasi kecerdasan buatan untuk menyelesaikan masalah kompleks.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href="#proyek" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5 group cursor-pointer">
                                Lihat Proyek
                                <LuArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <a href="#contact" className="inline-flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:border-teal-500 dark:hover:border-teal-500 bg-white/40 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-md cursor-pointer">
                                Hubungi Saya
                            </a>
                        </div>
                        
                        {/* Social Icons */}
                        <div className="flex items-center gap-5 pt-6 text-gray-700 dark:text-gray-300">
                            <a href="https://github.com/tribber" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer" aria-label="GitHub">
                                <LuGithub size={22} />
                            </a>
                            <a href="https://linkedin.com/in/yoni-tribber" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer" aria-label="LinkedIn">
                                <LuLinkedin size={22} />
                            </a>
                            <a href="mailto:tribberyoni5@gmail.com" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer" aria-label="Email">
                                <LuMail size={22} />
                            </a>
                        </div>
                    </div>

                    {/* Right Column Profile Image */}
                    <div className="md:col-span-5 flex justify-center relative py-12 overflow-visible" data-aos="zoom-in">
                        {/* Rotating ring decorators */}
                        <div className="absolute w-[290px] h-[290px] md:w-[380px] md:h-[380px] rounded-full border border-teal-500/20 border-dashed animate-[spin_30s_linear_infinite] z-0"></div>
                        <div className="absolute w-[310px] h-[310px] md:w-[400px] md:h-[400px] rounded-full border border-cyan-500/10 animate-[spin_20s_linear_infinite_reverse] z-0"></div>
                        
                        {/* Ambient Glow */}
                        <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] bg-teal-500/20 rounded-full blur-3xl opacity-60 z-0"></div>
                        
                        <div className="relative w-60 h-60 md:w-80 md:h-80 flex items-center justify-center group z-10 overflow-visible">
                            {/* Inner container for the image rounding (overflow-hidden prevents image zoom bleeding) */}
                            <div className="relative w-full h-full rounded-full p-2.5 bg-white/40 dark:bg-gray-900/40 border-2 border-white/50 dark:border-gray-800/50 shadow-2xl flex items-center justify-center overflow-hidden">
                                <Image 
                                    src="/yoni.jpg" 
                                    alt="Yoni Tribber Profile" 
                                    width={500} 
                                    height={500} 
                                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700 ease-out"
                                    priority
                                />
                            </div>
                            
                            {/* Badges */}
                            <div className="absolute -left-4 top-10 glass-card px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-semibold shadow-md animate-bounce z-30 transform-gpu" style={{ animationDuration: '4s' }}>
                                <LuCode className="text-teal-600 dark:text-teal-400" />
                                <span className="text-gray-800 dark:text-gray-100">3.81 IPK</span>
                            </div>
                            <div className="absolute -right-8 bottom-16 glass-card px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-semibold shadow-md animate-bounce z-30 transform-gpu" style={{ animationDuration: '6s' }}>
                                <LuCpu className="text-cyan-600 dark:text-cyan-400" />
                                <span className="text-gray-800 dark:text-gray-100">AI & ML Engineer</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Down */}
                <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer group">
                    <span className="w-5 h-8 rounded-full border-2 border-gray-400 dark:border-gray-600 group-hover:border-teal-500 transition-colors flex items-start justify-center p-1">
                        <span className="w-1.5 h-1.5 bg-gray-500 group-hover:bg-teal-500 rounded-full animate-bounce"></span>
                    </span>
                    <span className="text-xs uppercase tracking-widest font-semibold font-display">Scroll Down</span>
                </a>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-16" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">01 / Tentang Saya</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-gray-900 dark:text-white">Siapa Yoni Tribber?</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Bio Text Column */}
                        <div className="lg:col-span-7 flex flex-col justify-center space-y-6" data-aos="fade-right">
                            <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Menjembatani Data Dengan Kecerdasan Buatan</h3>
                            
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Saya adalah lulusan sarjana Teknik Informatika dari Universitas Catur Insan Cendekia yang memiliki ketertarikan mendalam pada Machine Learning, Rekayasa Data, dan Kecerdasan Buatan. Saya berfokus pada pengembangan solusi AI seperti chatbot berbasis Large Language Models (LLM) dengan arsitektur Retrieval-Augmented Generation (RAG) untuk pencarian dokumen yang cerdas dan relevan.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Dengan latar belakang akademis yang kuat dan pengalaman praktis melalui program MSIB di Pharos Group serta lulusan jalur Machine Learning di Bangkit Academy, saya mampu mengembangkan kode yang tidak hanya berkinerja tinggi tetapi juga bersih, terstruktur, dan terstandarisasi dengan baik.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 pt-6">
                                <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/10 text-center">
                                    <span className="block text-2xl md:text-3xl font-extrabold text-teal-600 dark:text-teal-400 font-display">3.81</span>
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">GPA / IPK</span>
                                </div>
                                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-center">
                                    <span className="block text-2xl md:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-display">10+</span>
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Proyek AI & Web</span>
                                </div>
                                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-center">
                                    <span className="block text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-display">4+</span>
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Sertifikat</span>
                                </div>
                            </div>
                        </div>

                        {/* Philosophy Cards Column */}
                        <div className="lg:col-span-5 flex flex-col space-y-6" data-aos="fade-left">
                            <div className="glass-card p-6 rounded-2xl flex gap-4 hover:scale-[1.02] transition-transform duration-300">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 shrink-0">
                                    <LuCpu size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-1">AI & ML Integration</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Implementasi model Deep Learning, NLP, arsitektur RAG, dan fine-tuning Computer Vision (YOLOv11).</p>
                                </div>
                            </div>
                            
                            <div className="glass-card p-6 rounded-2xl flex gap-4 hover:scale-[1.02] transition-transform duration-300">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
                                    <LuLayoutGrid size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-1">Modern Web Apps</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Pengembangan backend handal (FastAPI, Django, Laravel) dan integrasi frontend dinamis (React, Next.js).</p>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-2xl flex gap-4 hover:scale-[1.02] transition-transform duration-300">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                                    <LuZap size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-1">Optimized & Scalable</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Praktik penulisan kode bersih terstruktur, dockerization kontainer, dan optimasi query database SQL.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skill" className="py-24 bg-gray-500/5 border-y border-gray-200/20 dark:border-gray-800/20 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-16" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">02 / Keahlian Saya</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-gray-900 dark:text-white">Keahlian & Teknologi</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skillsList.map((category, idx) => (
                            <div key={idx} className="glass-card p-6 rounded-2xl" data-aos="fade-up" data-aos-delay={idx * 100}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-teal-500/10">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">{category.category}</h3>
                                </div>

                                <ul className="space-y-5">
                                    {category.skills.map((skill, sIdx) => (
                                        <li key={sIdx} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                    <span className="text-teal-500 dark:text-teal-400">{skill.icon}</span>
                                                    <span className="font-semibold">{skill.name}</span>
                                                </div>
                                                <span className="font-semibold text-teal-600 dark:text-teal-400">{skill.percent}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${skill.percent}%` }}
                                                ></div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="proyek" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-12" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">03 / Portofolio Saya</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-gray-900 dark:text-white">Proyek Pilihan</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex flex-wrap gap-3 mb-10" data-aos="fade-up">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 ${
                                    selectedCategory === cat
                                        ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/10"
                                        : "border border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-900/40 text-gray-600 dark:text-gray-300 hover:border-teal-500 dark:hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid of Projects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
                        {filteredProjects.map((project) => (
                            <article 
                                key={project.slug} 
                                className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div>
                                    {/* Project Image and Hover Eye Overlay */}
                                    <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                                        <Image 
                                            src={project.image} 
                                            alt={project.title} 
                                            fill 
                                            style={{ objectFit: "cover" }}
                                            className="group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                            <button 
                                                onClick={() => setSelectedProject(project)}
                                                className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-gray-900 shadow-lg hover:scale-110 transition-transform cursor-pointer"
                                                aria-label="Tinjau detail proyek"
                                            >
                                                <LuEye size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Text Info */}
                                    <div className="p-6 space-y-3">
                                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                                            {project.category}
                                        </span>
                                        <h3 
                                            onClick={() => setSelectedProject(project)}
                                            className="text-xl font-bold text-gray-900 dark:text-white font-display line-clamp-1 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                            {project.summary}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 pt-0 flex justify-between items-center">
                                    <span className="text-xs text-gray-700 dark:text-gray-300 font-medium font-mono">{project.date}</span>
                                    <button 
                                        onClick={() => setSelectedProject(project)}
                                        className="text-sm font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1 cursor-pointer transition-colors group/btn"
                                    >
                                        Detail Proyek
                                        <LuArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Details Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        onClick={() => setSelectedProject(null)} 
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                    ></div>
                    
                    {/* Modal Content Card */}
                    <div className="relative w-full max-w-4xl bg-white dark:bg-[#0b0f19] border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col">
                        
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200/30 dark:border-gray-800/30 flex items-center justify-between">
                            <div>
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 uppercase tracking-wide mb-1">
                                    {selectedProject.category}
                                </span>
                                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white leading-tight">
                                    {selectedProject.title}
                                </h3>
                            </div>
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                                aria-label="Tutup detail modal"
                            >
                                <LuX size={20} />
                            </button>
                        </div>
                        
                        {/* Body scroll area */}
                        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
                            {/* Project Banner Image */}
                            <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <Image 
                                    src={selectedProject.image} 
                                    alt={selectedProject.title} 
                                    fill 
                                    style={{ objectFit: "cover" }}
                                />
                            </div>

                            {/* Info grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-500/5 text-sm">
                                <div>
                                    <span className="block text-xs text-gray-700 dark:text-gray-300 font-semibold uppercase">Kategori</span>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedProject.category}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-700 dark:text-gray-300 font-semibold uppercase">Durasi Proyek</span>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedProject.date}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-700 dark:text-gray-300 font-semibold uppercase">Penulis</span>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">Yoni Tribber</span>
                                </div>
                                <div className="flex items-center md:justify-end">
                                    <Link 
                                        href={`/project/${selectedProject.slug}`} 
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                                    >
                                        Halaman Penuh
                                        <LuExternalLink size={14} />
                                    </Link>
                                </div>
                            </div>

                            {/* Markdown Render */}
                            <div className="prose dark:prose-invert max-w-none markdown pt-2 text-gray-700 dark:text-gray-300">
                                {modalLoading ? (
                                    <div className="flex flex-col items-center justify-center py-12 space-y-3">
                                        <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin"></div>
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Memuat rincian proyek...</span>
                                    </div>
                                ) : (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                        {modalContent}
                                    </ReactMarkdown>
                                )}
                            </div>
                        </div>

                        {/* Footer details button */}
                        <div className="p-4 border-t border-gray-200/30 dark:border-gray-800/30 bg-gray-500/5 flex justify-end">
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Experience & Education Timeline */}
            <section id="history" className="py-24 bg-gray-500/5 border-y border-gray-200/20 dark:border-gray-800/20 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-16" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">04 / Riwayat</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-gray-900 dark:text-white">Pendidikan & Pengalaman</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    {/* Timeline Tree */}
                    <div className="relative max-w-4xl mx-auto pl-6 md:pl-0">
                        {/* Middle connector line */}
                        <div className="absolute left-[9px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-500 via-cyan-500 to-transparent transform md:-translate-x-1/2"></div>
                        
                        <div className="space-y-12">
                            {timelineData.map((item, idx) => {
                                const isLeft = idx % 2 === 0;
                                return (
                                    <div 
                                        key={idx} 
                                        className={`relative flex flex-col md:flex-row items-start ${
                                            isLeft ? "md:justify-start" : "md:justify-end"
                                        }`}
                                        data-aos={isLeft ? "fade-right" : "fade-left"}
                                    >
                                        {/* Dot Indicator */}
                                        <div className="absolute left-[-22px] md:left-1/2 w-[16px] h-[16px] rounded-full border-4 border-white dark:border-[#0b0f19] bg-teal-500 transform md:-translate-x-1/2 top-1.5 shadow-md shadow-teal-500/30 z-10"></div>
                                        
                                        {/* Timeline Date Pill (Desktop) */}
                                        <div className={`hidden md:block absolute top-1.5 text-sm font-bold font-mono tracking-wide px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 ${
                                            isLeft ? "left-[53%]" : "right-[53%]"
                                        }`}>
                                            {item.date}
                                        </div>

                                        {/* Card Wrapper */}
                                        <div className={`w-full md:w-[45%] rounded-2xl p-6 glass-card border border-gray-200/50 dark:border-gray-800/50 relative hover:border-teal-500/40 dark:hover:border-teal-500/30 transition-colors`}>
                                            {/* Date Pill (Mobile) */}
                                            <div className="inline-block md:hidden text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-3">
                                                {item.date}
                                            </div>
                                            
                                            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white leading-snug">{item.title}</h3>
                                            <h4 className="text-sm font-semibold text-teal-600 dark:text-teal-400 mt-1 mb-4">{item.subtitle}</h4>
                                            
                                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-4 leading-relaxed">
                                                {item.description.map((desc, dIdx) => (
                                                    <li key={dIdx}>{desc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Certificates Section */}
            <section id="sertifikat" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-16" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">05 / Sertifikasi</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-gray-900 dark:text-white">Sertifikasi Resmi</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {myData.certificates.map((cert, idx) => (
                            <div 
                                key={idx} 
                                className="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-200/50 dark:border-gray-800/50 group hover:border-teal-500/30 transition-all duration-300"
                                data-aos="fade-up"
                                data-aos-delay={idx * 100}
                            >
                                <div className="relative w-full md:w-44 h-48 md:h-auto shrink-0 bg-gray-100 dark:bg-gray-800">
                                    <Image 
                                        src={cert.image} 
                                        alt={cert.name} 
                                        fill 
                                        style={{ objectFit: "cover" }}
                                        className="group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide">{cert.issuer}</span>
                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{cert.year}</span>
                                        </div>
                                        <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white leading-tight">{cert.name}</h3>
                                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">{cert.description}</p>
                                    </div>
                                    
                                    {cert.link && (
                                        <div>
                                            <a 
                                                href={cert.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                                            >
                                                Verifikasi Kredensial
                                                <LuArrowUpRight size={12} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-gray-500/5 border-t border-gray-200/20 dark:border-gray-800/20 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-16" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">06 / Hubungi Saya</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-gray-900 dark:text-white">Mari Berkolaborasi</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Info Column */}
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-8" data-aos="fade-right">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Ada tawaran menarik? Silakan kontak saya.</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Saya terbuka untuk diskusi seputar proyek Machine Learning, implementasi RAG & LLM chatbot, pengembangan aplikasi web fullstack, atau kesempatan berkarir secara penuh/kontrak. Silakan hubungi saya melalui form atau informasi kontak berikut.
                                </p>
                            </div>

                            <ul className="space-y-6">
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 shrink-0">
                                        <LuMail size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Kirim Email</span>
                                        <a href={`mailto:${myData.email}`} className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{myData.email}</a>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
                                        <LuPhone size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Telepon / WhatsApp</span>
                                        <a href={`tel:${myData.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{myData.phone}</a>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                                        <LuMapPin size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Lokasi Saat Ini</span>
                                        <address className="text-sm font-semibold not-italic text-gray-800 dark:text-gray-200">Cirebon / Jakarta, Indonesia</address>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7" data-aos="fade-left">
                            <form onSubmit={handleFormSubmit} className="glass-card p-8 rounded-2xl space-y-6" noValidate>
                                
                                {/* Name Input */}
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        id="formName" 
                                        value={formName}
                                        onChange={(e) => {
                                            setFormName(e.target.value);
                                            if (e.target.value.trim()) setFormErrors(prev => ({...prev, name: ""}));
                                        }}
                                        placeholder=" " 
                                        className={`block w-full px-4 py-4 text-sm bg-transparent rounded-xl border appearance-none focus:outline-none focus:ring-0 peer ${
                                            formErrors.name 
                                                ? "border-red-500 focus:border-red-500 text-red-500" 
                                                : "border-gray-200 dark:border-gray-800 focus:border-teal-500 dark:focus:border-teal-400 text-gray-900 dark:text-white"
                                        }`}
                                    />
                                    <label 
                                        htmlFor="formName" 
                                        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#0b0f19] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 ${
                                            formErrors.name 
                                                ? "text-red-500" 
                                                : "text-gray-600 dark:text-gray-400 peer-focus:text-teal-600 dark:peer-focus:text-teal-400"
                                        }`}
                                    >
                                        Nama Lengkap
                                    </label>
                                    {formErrors.name && (
                                        <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">
                                            <span>{formErrors.name}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        id="formEmail" 
                                        value={formEmail}
                                        onChange={(e) => {
                                            setFormEmail(e.target.value);
                                            if (e.target.value.trim()) setFormErrors(prev => ({...prev, email: ""}));
                                        }}
                                        placeholder=" " 
                                        className={`block w-full px-4 py-4 text-sm bg-transparent rounded-xl border appearance-none focus:outline-none focus:ring-0 peer ${
                                            formErrors.email 
                                                ? "border-red-500 focus:border-red-500 text-red-500" 
                                                : "border-gray-200 dark:border-gray-800 focus:border-teal-500 dark:focus:border-teal-400 text-gray-900 dark:text-white"
                                        }`}
                                    />
                                    <label 
                                        htmlFor="formEmail" 
                                        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#0b0f19] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 ${
                                            formErrors.email 
                                                ? "text-red-500" 
                                                : "text-gray-600 dark:text-gray-400 peer-focus:text-teal-600 dark:peer-focus:text-teal-400"
                                        }`}
                                    >
                                        Alamat Email
                                    </label>
                                    {formErrors.email && (
                                        <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">
                                            <span>{formErrors.email}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Subject Input */}
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        id="formSubject" 
                                        value={formSubject}
                                        onChange={(e) => {
                                            setFormSubject(e.target.value);
                                            if (e.target.value.trim()) setFormErrors(prev => ({...prev, subject: ""}));
                                        }}
                                        placeholder=" " 
                                        className={`block w-full px-4 py-4 text-sm bg-transparent rounded-xl border appearance-none focus:outline-none focus:ring-0 peer ${
                                            formErrors.subject 
                                                ? "border-red-500 focus:border-red-500 text-red-500" 
                                                : "border-gray-200 dark:border-gray-800 focus:border-teal-500 dark:focus:border-teal-400 text-gray-900 dark:text-white"
                                        }`}
                                    />
                                    <label 
                                        htmlFor="formSubject" 
                                        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#0b0f19] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 ${
                                            formErrors.subject 
                                                ? "text-red-500" 
                                                : "text-gray-600 dark:text-gray-400 peer-focus:text-teal-600 dark:peer-focus:text-teal-400"
                                        }`}
                                    >
                                        Subjek Pesan
                                    </label>
                                    {formErrors.subject && (
                                        <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">
                                            <span>{formErrors.subject}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Message Input */}
                                <div className="relative">
                                    <textarea 
                                        id="formMessage" 
                                        value={formMessage}
                                        onChange={(e) => {
                                            setFormMessage(e.target.value);
                                            if (e.target.value.trim()) setFormErrors(prev => ({...prev, message: ""}));
                                        }}
                                        placeholder=" " 
                                        rows={5}
                                        className={`block w-full px-4 py-4 text-sm bg-transparent rounded-xl border appearance-none focus:outline-none focus:ring-0 peer resize-y min-h-[120px] ${
                                            formErrors.message 
                                                ? "border-red-500 focus:border-red-500 text-red-500" 
                                                : "border-gray-200 dark:border-gray-800 focus:border-teal-500 dark:focus:border-teal-400 text-gray-900 dark:text-white"
                                        }`}
                                    ></textarea>
                                    <label 
                                        htmlFor="formMessage" 
                                        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#0b0f19] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 ${
                                            formErrors.message 
                                                ? "text-red-500" 
                                                : "text-gray-600 dark:text-gray-400 peer-focus:text-teal-600 dark:peer-focus:text-teal-400"
                                        }`}
                                    >
                                        Isi Pesan Anda
                                    </label>
                                    {formErrors.message && (
                                        <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">
                                            <span>{formErrors.message}</span>
                                        </p>
                                    )}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold px-6 py-4 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                                            <span>Mengirim Pesan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Kirim Pesan</span>
                                            <LuSend className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scroll back to top float button */}
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer ${
                    showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
                aria-label="Kembali ke atas"
            >
                <LuArrowUp size={20} />
            </button>

            {/* Toast Notifications */}
            <div className={`fixed bottom-8 left-8 z-50 glass-card px-5 py-4 rounded-2xl flex items-center gap-3 border-teal-500/20 shadow-2xl transition-all duration-500 ${
                toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`} role="alert">
                <LuCircleCheck size={22} className="text-teal-500 shrink-0" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{toast.message}</span>
            </div>
        </div>
    );
}
