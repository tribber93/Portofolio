"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
    LuMail,
    LuMapPin,
    LuSend,
    LuCircleCheck,
    LuArrowUp,
    LuBriefcase,
    LuGraduationCap
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
    SiGooglegemini,
    SiReact
} from "react-icons/si";

import myData from "@/app/data/myData.json";
import projectsData from "@/app/data/projectsData.json";

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

    // Handle hash scroll on initial load (e.g. when navigating from project detail page)
    useEffect(() => {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 300);
        }
    }, []);

    // Project filtering
    const categories = ["All", "AI/Data/ML", "Web", "Mobile"];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const filteredProjects = selectedCategory === "All"
        ? projectsData
        : projectsData.filter(p => p.category === selectedCategory);

    // History Timeline filtering State
    const [activeHistoryTab, setActiveHistoryTab] = useState<"work" | "education">("work");

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
            newErrors.name = "Full name is required.";
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formEmail.trim()) {
            newErrors.email = "Email address is required.";
            valid = false;
        } else if (!emailRegex.test(formEmail)) {
            newErrors.email = "Invalid email format.";
            valid = false;
        }

        if (!formSubject.trim()) {
            newErrors.subject = "Subject is required.";
            valid = false;
        }

        if (!formMessage.trim()) {
            newErrors.message = "Message content cannot be empty.";
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
            triggerToast("Your message has been sent successfully!");
        }, 1500);
    };

    // Skills custom listing (Categorized)
    const skillsList = [
        {
            category: "Machine Learning & AI",
            icon: <LuCpu className="w-5 h-5 text-teal-400" />,
            skills: [
                { name: "Python", icon: <SiPython />, hoverColor: "group-hover/skill:text-yellow-500" },
                { name: "TensorFlow", icon: <SiTensorflow />, hoverColor: "group-hover/skill:text-orange-500" },
                { name: "PyTorch", icon: <SiPytorch />, hoverColor: "group-hover/skill:text-red-500" },
                { name: "Keras & scikit-learn", icon: <SiScikitlearn />, hoverColor: "group-hover/skill:text-blue-400" },
                { name: "LLMs (OpenAI & Gemini)", icon: <SiGooglegemini />, hoverColor: "group-hover/skill:text-emerald-400" },
                { name: "NLP & Hugging Face", icon: <SiHuggingface />, hoverColor: "group-hover/skill:text-yellow-400" }
            ]
        },
        {
            category: "Backend & Deployment",
            icon: <LuDatabase className="w-5 h-5 text-teal-400" />,
            skills: [
                { name: "FastAPI & Django", icon: <SiFastapi />, hoverColor: "group-hover/skill:text-emerald-500" },
                { name: "PHP (Laravel)", icon: <SiPhp />, hoverColor: "group-hover/skill:text-indigo-400" },
                { name: "Docker", icon: <SiDocker />, hoverColor: "group-hover/skill:text-sky-500" },
                { name: "Git & Workflows", icon: <SiGit />, hoverColor: "group-hover/skill:text-orange-600" }
            ]
        },
        {
            category: "Frontend & Mobile",
            icon: <LuLayoutGrid className="w-5 h-5 text-teal-400" />,
            skills: [
                { name: "JavaScript", icon: <SiJavascript />, hoverColor: "group-hover/skill:text-yellow-300" },
                { name: "React & Next.js", icon: <SiReact />, hoverColor: "group-hover/skill:text-cyan-400" },
                { name: "Flutter", icon: <SiFlutter />, hoverColor: "group-hover/skill:text-sky-400" }
            ]
        }
    ];

    // Consolidated Education + Experience Timeline Data
    const timelineData = [
        {
            type: "work",
            title: "Machine Learning Engineer Intern",
            subtitle: "PT. Inti Utama Solusindo (Pharos Group)",
            date: "Aug 2023 - Dec 2023",
            description: [
                "Developed an intelligent RAG chatbot based on Django & Langchain using trusted health journals.",
                "Extracted and compiled a structured knowledge base from open-access journals.",
                "Optimized PostgreSQL relational database queries for chatbot search performance.",
                "Worked alongside the medical team to evaluate LLM model performance."
            ]
        },
        {
            type: "education",
            title: "Bachelor of Informatics Engineering",
            subtitle: "Universitas Catur Insan Cendekia",
            date: "2020 - 2024",
            description: [
                "Graduated with Honors.",
                "Received the Best Thesis award in the Informatics Engineering program with a research focus on AI RAG.",
                "Active in student organizations and technology development competitions."
            ]
        },
        {
            type: "work",
            title: "Machine Learning Cohort",
            subtitle: "Bangkit Academy (Google, GoTo, Traveloka)",
            date: "Jan 2023 - Jul 2023",
            description: [
                "Completed intensive Machine Learning curriculum: TensorFlow, Deep Learning, and Cloud Computing.",
                "Built a smart questionnaire recommendation capstone project (Quisiin) using deep learning.",
                "Passed the Google TensorFlow Developer Certificate certification."
            ]
        },
        {
            type: "org",
            title: "Vice Head of Research & Development Division",
            subtitle: "HIMATIF Universitas Catur Insan Cendekia",
            date: "2022",
            description: [
                "Led and designed research program strategies and student technology training.",
                "Organized basic web development and machine learning workshops for members."
            ]
        },
        {
            type: "education",
            title: "Senior High School (IPA)",
            subtitle: "SMA Negeri 1 Beber",
            date: "2015 - 2018",
            description: [
                "Majored in Mathematics and Natural Sciences (MIPA)."
            ]
        }
    ];

    const filteredTimeline = timelineData.filter(item => {
        if (activeHistoryTab === "work") {
            return item.type === "work";
        } else {
            return item.type === "education" || item.type === "org";
        }
    });

    return (
        <div className="relative min-h-screen">
            {/* Hero Section */}
            <section id="hero" className="min-h-screen flex items-center pt-28 md:pt-0 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* Left Column Text */}
                    <div className="md:col-span-7 flex flex-col items-start text-left space-y-6" data-aos="fade-up">


                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight tracking-tight text-white">
                            Designing & Building <br />
                            <span className="gradient-text">Intelligent AI Solutions</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-sans max-w-2xl">
                            Hi, I am <strong className="text-teal-400 font-bold">{myData.name}</strong>, a <span className="text-white font-semibold font-mono">{typedText}</span><span className="typed-cursor">|</span>.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href="#proyek" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5 group cursor-pointer">
                                View Projects
                                <LuArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <a href="#contact" className="inline-flex items-center justify-center border border-gray-800 hover:border-teal-500 bg-gray-900/40 text-gray-300 hover:text-teal-400 font-medium px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-md cursor-pointer">
                                Contact Me
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-5 pt-6 text-gray-300">
                            <a href="https://github.com/tribber" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors cursor-pointer" aria-label="GitHub">
                                <LuGithub size={22} />
                            </a>
                            <a href="https://linkedin.com/in/yoni-tribber" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors cursor-pointer" aria-label="LinkedIn">
                                <LuLinkedin size={22} />
                            </a>
                            <a href="mailto:tribberyoni5@gmail.com" className="hover:text-teal-400 transition-colors cursor-pointer" aria-label="Email">
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
                            <div className="relative w-full h-full rounded-full p-2.5 bg-gray-900/40 border-2 border-gray-800/50 shadow-2xl flex items-center justify-center overflow-hidden">
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
                                <LuCode className="text-teal-400" />
                                <span className="text-gray-100">Fullstack Dev</span>
                            </div>
                            <div className="absolute -right-8 bottom-16 glass-card px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-semibold shadow-md animate-bounce z-30 transform-gpu" style={{ animationDuration: '6s' }}>
                                <LuCpu className="text-cyan-400" />
                                <span className="text-gray-100">AI & ML Engineer</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Down */}
                <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-300 hover:text-teal-400 transition-colors cursor-pointer group">
                    <span className="w-5 h-8 rounded-full border-2 border-gray-600 group-hover:border-teal-500 transition-colors flex items-start justify-center p-1">
                        <span className="w-1.5 h-1.5 bg-gray-500 group-hover:bg-teal-500 rounded-full animate-bounce"></span>
                    </span>
                    <span className="text-xs uppercase tracking-widest font-semibold font-display">Scroll Down</span>
                </a>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-16" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">01 / About Me</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-white">Who is Yoni Tribber?</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Bio Text Column */}
                        <div className="lg:col-span-7 flex flex-col justify-center space-y-6" data-aos="fade-right">
                            <h3 className="text-2xl font-bold font-display text-white">Bridging Data with Artificial Intelligence</h3>

                            <p className="text-gray-300 leading-relaxed">
                                I am an Informatics Engineering graduate specializing in Machine Learning and AI Development. I focus on building intelligent solutions, such as Retrieval-Augmented Generation (RAG) chatbots and deep learning models.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                With practical experience from Bangkit Academy and internships, I aim to develop clean, structured, and high-performing code that solves real-world problems.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-6 pt-6">
                                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-center">
                                    <span className="block text-2xl md:text-3xl font-extrabold text-cyan-400 font-display">10+</span>
                                    <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">AI & Web Projects</span>
                                </div>
                                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-center">
                                    <span className="block text-2xl md:text-3xl font-extrabold text-blue-400 font-display">4+</span>
                                    <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Certificates</span>
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
                                    <h4 className="text-lg font-bold text-white font-display mb-1">AI & ML Integration</h4>
                                    <p className="text-sm text-gray-300">Implementation of Deep Learning models, NLP, RAG architecture, and Computer Vision fine-tuning (YOLOv11).</p>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-2xl flex gap-4 hover:scale-[1.02] transition-transform duration-300">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
                                    <LuLayoutGrid size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white font-display mb-1">Modern Web Apps</h4>
                                    <p className="text-sm text-gray-300">Development of robust backends (FastAPI, Django, Laravel) and dynamic frontend integration (React, Next.js).</p>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-2xl flex gap-4 hover:scale-[1.02] transition-transform duration-300">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                                    <LuZap size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white font-display mb-1">Optimized & Scalable</h4>
                                    <p className="text-sm text-gray-300">Clean and structured coding practices, container dockerization, and SQL database query optimization.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skill" className="py-24 bg-gray-500/5 border-y border-gray-800/20 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-16" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">02 / My Skills</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-white">Skills & Technologies</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skillsList.map((category, idx) => (
                            <div
                                key={idx}
                                className="glass-card p-6 md:p-8 rounded-3xl border border-gray-800/40 relative overflow-hidden group shadow-2xl hover:border-teal-500/20 transition-all duration-500"
                                data-aos="fade-up"
                                data-aos-delay={idx * 100}
                            >
                                {/* Soft glow effect in card background */}
                                <div className="absolute -right-16 -top-16 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition-all duration-500 pointer-events-none"></div>

                                <div className="flex items-center gap-3 mb-6 relative z-10">
                                    <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-white font-display tracking-wide">{category.category}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2.5 relative z-10">
                                    {category.skills.map((skill, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gray-900/40 border border-gray-800/60 hover:border-teal-500/30 hover:bg-gray-800/20 text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-950/20 group/skill cursor-default"
                                        >
                                            <span className={`text-xl text-gray-400 ${skill.hoverColor || "group-hover/skill:text-teal-400"} group-hover/skill:scale-110 transition-all duration-300`}>
                                                {skill.icon}
                                            </span>
                                            <span className="text-xs font-bold tracking-wide select-none">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="proyek" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-12" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">03 / My Portfolio</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-white">Featured Projects</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex flex-wrap gap-3 mb-10" data-aos="fade-up">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 ${selectedCategory === cat
                                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/10"
                                    : "border border-gray-800 bg-gray-900/40 text-gray-300 hover:border-teal-500 hover:text-teal-400"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid of Projects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
                        {filteredProjects.slice(0, 3).map((project) => (
                            <article
                                key={project.slug}
                                className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 hover:-translate-y-1"
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
                                                aria-label="Review project details"
                                            >
                                                <LuEye size={20} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Text Info */}
                                    <div className="p-6 space-y-3">
                                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 uppercase tracking-wide">
                                            {project.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-white font-display line-clamp-1 hover:text-teal-400 transition-colors cursor-pointer">
                                            <Link href={`/project/${project.slug}`}>
                                                {project.title}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
                                            {project.summary}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 pt-0 flex justify-between items-center">
                                    <span className="text-xs text-gray-300 font-medium font-mono">{project.date}</span>
                                    <Link
                                        href={`/project/${project.slug}`}
                                        className="text-sm font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer transition-colors group/btn"
                                    >
                                        Project Details
                                        <LuArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* View All Projects Button */}
                    <div className="flex justify-center mt-12" data-aos="fade-up">
                        <Link
                            href="/project"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-teal-500/10 hover:-translate-y-0.5 group cursor-pointer"
                        >
                            View All Projects
                            <LuArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Experience & Education Timeline */}
            <section id="history" className="py-24 bg-gray-500/5 border-y border-gray-800/20 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-center text-center mb-12" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">04 / History</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-white">Education & Experience</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center gap-4 mb-12" data-aos="fade-up">
                        <button
                            onClick={() => setActiveHistoryTab("work")}
                            className={`px-6 py-3 rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 flex items-center gap-2 ${activeHistoryTab === "work"
                                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/10 border border-transparent"
                                : "border border-gray-800 bg-gray-900/40 text-gray-300 hover:border-teal-500 hover:text-teal-400"
                                }`}
                        >
                            <LuBriefcase size={16} />
                            Work Experience
                        </button>
                        <button
                            onClick={() => setActiveHistoryTab("education")}
                            className={`px-6 py-3 rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 flex items-center gap-2 ${activeHistoryTab === "education"
                                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/10 border border-transparent"
                                : "border border-gray-800 bg-gray-900/40 text-gray-300 hover:border-teal-500 hover:text-teal-400"
                                }`}
                        >
                            <LuGraduationCap size={16} />
                            Education & Leadership
                        </button>
                    </div>

                    {/* Timeline List (One-sided Compact Layout) */}
                    <div className="relative max-w-2xl mx-auto pl-6 md:pl-8">
                        {/* Vertical line on the left */}
                        <div className="absolute left-[9px] md:left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-teal-500 via-cyan-500 to-transparent"></div>

                        <div className="space-y-8">
                            {filteredTimeline.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="relative pl-6 md:pl-8"
                                    data-aos="fade-up"
                                    data-aos-delay={idx * 100}
                                >
                                    {/* Dot Indicator */}
                                    <div className="absolute left-[-22px] md:left-[-20px] w-[14px] h-[14px] rounded-full border-4 border-[#0b0f19] bg-teal-500 top-1.5 shadow-md shadow-teal-500/30 z-10"></div>

                                    {/* Card Wrapper */}
                                    <div className="w-full rounded-2xl p-6 glass-card border border-gray-800/50 hover:border-teal-500/30 transition-all duration-300 relative group">
                                        {/* Dynamic category badge */}
                                        {item.type === "org" && (
                                            <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-500/20">
                                                Leadership
                                            </span>
                                        )}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                            <h3 className="text-xl font-bold font-display text-white leading-snug">{item.title}</h3>
                                            <span className="inline-block text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 self-start sm:self-auto shrink-0">
                                                {item.date}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-semibold text-teal-400 mb-4">{item.subtitle}</h4>

                                        <ul className="space-y-2 text-sm text-gray-300 list-disc pl-4 leading-relaxed">
                                            {item.description.map((desc, dIdx) => (
                                                <li key={dIdx}>{desc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Certificates Section */}
            <section id="sertifikat" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-16" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">05 / Certifications</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-white">Official Certifications</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {myData.certificates.map((cert, idx) => (
                            <div
                                key={idx}
                                className="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-800/50 group hover:border-teal-500/30 transition-all duration-300"
                                data-aos="fade-up"
                                data-aos-delay={idx * 100}
                            >
                                <div className="relative w-full md:w-44 h-48 md:h-auto shrink-0 bg-gray-800">
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
                                            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wide">{cert.issuer}</span>
                                            <span className="text-xs font-bold text-gray-300">{cert.year}</span>
                                        </div>
                                        <h3 className="text-lg font-bold font-display text-white leading-tight">{cert.name}</h3>
                                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">{cert.description}</p>
                                    </div>

                                    {cert.link && (
                                        <div>
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-bold text-teal-400 hover:underline cursor-pointer"
                                            >
                                                Verify Credentials
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
            <section id="contact" className="py-24 bg-gray-500/5 border-t border-gray-800/20 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start mb-16" data-aos="fade-up">
                        <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">06 / Contact Me</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display mt-2 text-white">Let&apos;s Collaborate</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Info Column */}
                        <div className="lg:col-span-5 flex flex-col space-y-8" data-aos="fade-right">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold font-display text-white">Have an exciting opportunity? Let&apos;s get in touch.</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    I am open to discussions about Machine Learning projects, RAG & LLM chatbot implementations, fullstack web development, or full-time/contract career opportunities. Feel free to contact me using the form or the info below.
                                </p>
                            </div>

                            <ul className="space-y-6">
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 shrink-0">
                                        <LuMail size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-300 uppercase">Email Me</span>
                                        <a href={`mailto:${myData.email}`} className="text-sm font-semibold text-gray-200 hover:text-teal-400 transition-colors">{myData.email}</a>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                                        <LuMapPin size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-300 uppercase">Current Location</span>
                                        <address className="text-sm font-semibold not-italic text-gray-200">Cirebon, Indonesia</address>
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
                                            if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, name: "" }));
                                        }}
                                        placeholder=" "
                                        className={`block w-full px-4 py-4 text-sm bg-transparent rounded-xl border appearance-none focus:outline-none focus:ring-0 peer ${formErrors.name
                                            ? "border-red-500 focus:border-red-500 text-red-500"
                                            : "border-gray-800 focus:border-teal-400 text-white"
                                            }`}
                                    />
                                    <label
                                        htmlFor="formName"
                                        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-[#0b0f19] peer-not-placeholder-shown:bg-[#0b0f19] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 ${formErrors.name
                                            ? "text-red-500"
                                            : "text-gray-400 peer-focus:text-teal-400"
                                            }`}
                                    >
                                        Full Name
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
                                            if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, email: "" }));
                                        }}
                                        placeholder=" "
                                        className={`block w-full px-4 py-4 text-sm bg-transparent rounded-xl border appearance-none focus:outline-none focus:ring-0 peer ${formErrors.email
                                            ? "border-red-500 focus:border-red-500 text-red-500"
                                            : "border-gray-800 focus:border-teal-400 text-white"
                                            }`}
                                    />
                                    <label
                                        htmlFor="formEmail"
                                        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-[#0b0f19] peer-not-placeholder-shown:bg-[#0b0f19] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 ${formErrors.email
                                            ? "text-red-500"
                                            : "text-gray-400 peer-focus:text-teal-400"
                                            }`}
                                    >
                                        Email Address
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
                                            if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, subject: "" }));
                                        }}
                                        placeholder=" "
                                        className={`block w-full px-4 py-4 text-sm bg-transparent rounded-xl border appearance-none focus:outline-none focus:ring-0 peer ${formErrors.subject
                                            ? "border-red-500 focus:border-red-500 text-red-500"
                                            : "border-gray-800 focus:border-teal-400 text-white"
                                            }`}
                                    />
                                    <label
                                        htmlFor="formSubject"
                                        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-[#0b0f19] peer-not-placeholder-shown:bg-[#0b0f19] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 ${formErrors.subject
                                            ? "text-red-500"
                                            : "text-gray-400 peer-focus:text-teal-400"
                                            }`}
                                    >
                                        Subject
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
                                            if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, message: "" }));
                                        }}
                                        placeholder=" "
                                        rows={5}
                                        className={`block w-full px-4 py-4 text-sm bg-transparent rounded-xl border appearance-none focus:outline-none focus:ring-0 peer resize-y min-h-[120px] ${formErrors.message
                                            ? "border-red-500 focus:border-red-500 text-red-500"
                                            : "border-gray-800 focus:border-teal-400 text-white"
                                            }`}
                                    ></textarea>
                                    <label
                                        htmlFor="formMessage"
                                        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-[#0b0f19] peer-not-placeholder-shown:bg-[#0b0f19] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 ${formErrors.message
                                            ? "text-red-500"
                                            : "text-gray-400 peer-focus:text-teal-400"
                                            }`}
                                    >
                                        Your Message
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
                                            <span>Sending Message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
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
                className={`fixed bottom-8 right-8 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                aria-label="Back to top"
            >
                <LuArrowUp size={20} />
            </button>

            {/* Toast Notifications */}
            <div className={`fixed bottom-8 left-8 z-50 glass-card px-5 py-4 rounded-2xl flex items-center gap-3 border-teal-500/20 shadow-2xl transition-all duration-500 ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`} role="alert">
                <LuCircleCheck size={22} className="text-teal-500 shrink-0" />
                <span className="text-sm font-semibold text-gray-200">{toast.message}</span>
            </div>
        </div>
    );
}
