// src/app/project/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import projects from "../../data/projectsData.json";
import ProfileCard from "@/app/components/cards";
import ReadingProgressBar from "@/app/components/ReadingProgressBar";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import fs from "fs/promises";
import path from "path";
import rehypeRaw from "rehype-raw";
import type { Metadata, ResolvingMetadata } from "next";
import {
    LuCalendar,
    LuArrowLeft,
    LuTag,
    LuBookmark,
    LuClock,
    LuGithub,
    LuLayers,
    LuCpu,
    LuYoutube,
    LuGlobe,
    LuGamepad2,
    LuBookOpen,
    LuLink
} from "react-icons/lu";

type Props = {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// ✅ Pola generateMetadata untuk SEO
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: "Project Not Found",
            description: "Project detail not found.",
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${project.title} | Yoni Tribber`,
        description: project.summary ?? "Detail and description of this project.",
        openGraph: {
            images: project.image ? [project.image, ...previousImages] : previousImages,
        },
    };
}

// ✅ Static path generation
export async function generateStaticParams() {
    return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

// ✅ Membaca konten markdown dari file
async function getMarkdownContent(relativePath: string) {
    try {
        const filePath = path.join(process.cwd(), "public", relativePath);
        const content = await fs.readFile(filePath, "utf-8");
        return content;
    } catch (error) {
        console.error("Failed to read markdown file:", error);
        return "Project content is currently not available.";
    }
}

// ✅ Komponen Halaman Utama
export default async function DetailProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return notFound();
    }

    const markdownContent = await getMarkdownContent(project.content);

    // 🕒 Menghitung Estimasi Waktu Baca
    const wordsPerMinute = 200;
    const textLength = markdownContent.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(textLength / wordsPerMinute));

    // 🔗 Ekstraksi Link Aksi (GitHub, Paper, Publikasi, dsb.) secara Dinamis menggunakan Regex
    const actions: { label: string; url: string; type: string }[] = [];

    // 1. Ambil dari field "urls" di projectsData.json (Prioritas Utama)
    if (project.urls) {
        Object.entries(project.urls).forEach(([key, url]) => {
            if (url) {
                actions.push({
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    url: url as string,
                    type: key.toLowerCase()
                });
            }
        });
    }

    // 2. Ekstraksi dari Markdown (Fallback)
    const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    let match;
    while ((match = mdLinkRegex.exec(markdownContent)) !== null) {
        const label = match[1];
        const url = match[2];
        const lowerUrl = url.toLowerCase();

        // Hindari duplikasi jika sudah ada di urls
        if (actions.some(a => a.url === url)) continue;

        if (lowerUrl.includes("github.com")) {
            actions.push({
                label: label.replace(/🔗|\*\*|\*/g, "").trim(),
                url,
                type: "github"
            });
        } else if (
            lowerUrl.includes("journal") ||
            lowerUrl.includes("article") ||
            lowerUrl.includes("view/") ||
            lowerUrl.includes("doi.org") ||
            lowerUrl.includes("research") ||
            lowerUrl.includes("paper")
        ) {
            actions.push({
                label: label.replace(/🔗|\*\*|\*/g, "").trim(),
                url,
                type: "journal"
            });
        }
    }

    // 🛠️ Ekstraksi Tech Stack (Teknologi yang Digunakan) secara Dinamis
    const techStack: string[] = [];
    const techSectionRegex = /(?:##|###)\s*(?:🛠️|💡)?\s*(?:Tools Used|Technologies Used|Skills Demonstrated)[^\n]*\n([\s\S]*?)(?:\n---|\n#)/i;
    const sectionMatch = markdownContent.match(techSectionRegex);

    if (sectionMatch) {
        const lines = sectionMatch[1].split("\n");
        for (const line of lines) {
            if (line.trim().startsWith("-")) {
                const cleanLine = line
                    .replace(/^-\s*[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\s*/g, "")
                    .replace(/^-\s*/, "")
                    .trim();

                let techName = "";
                const boldMatch = cleanLine.match(/\*\*([^*]+)\*\*/);
                if (boldMatch) {
                    techName = boldMatch[1];
                } else {
                    const colonIdx = cleanLine.indexOf(":");
                    if (colonIdx > -1) {
                        techName = cleanLine.substring(0, colonIdx);
                    } else {
                        techName = cleanLine;
                    }
                }

                const linkMatch = techName.match(/\[([^\]]+)\]/);
                if (linkMatch) {
                    techName = linkMatch[1];
                }

                techName = techName.trim();
                if (techName && techName.length < 35 && !techStack.includes(techName)) {
                    techStack.push(techName);
                }
            }
        }
    }

    // Fallback tech stack jika tidak terdeteksi dari Markdown
    if (techStack.length === 0) {
        if (project.category === "AI/Data/ML") {
            techStack.push("Python", "TensorFlow", "Scikit-Learn", "Machine Learning", "AI");
        } else if (project.category === "Web") {
            techStack.push("Next.js", "React", "TypeScript", "Tailwind CSS", "Web Dev");
        } else if (project.category === "Mobile") {
            techStack.push("Flutter", "Dart", "Firebase", "GetX", "Mobile App");
        }
    }

    return (
        <>
            {/* Scroll Reading Progress Bar */}
            <ReadingProgressBar />

            <main className="relative min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">

                {/* Breadcrumbs & Back Button (Integrated inline) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 text-sm" data-aos="fade-up">
                    <nav className="flex items-center space-x-2 text-gray-400">
                        <Link href="/" className="hover:text-teal-400 font-medium transition-colors">Home</Link>
                        <span className="text-gray-600">/</span>
                        <Link href="/project" className="hover:text-teal-400 font-medium transition-colors">Projects</Link>
                        <span className="text-gray-600">/</span>
                        <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-[400px]">{project.title}</span>
                    </nav>
                    <Link
                        href="/project"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-teal-400 transition-all bg-gray-900/60 hover:bg-gray-800/80 px-4 py-2.5 rounded-xl border border-gray-800/80 shadow-md group"
                    >
                        <LuArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>
                </div>

                {/* Immersive Hero Header Section */}
                <div
                    className="relative w-full rounded-3xl overflow-hidden border border-gray-800/50 bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-transparent p-6 md:p-10 lg:p-12 mb-12 shadow-2xl shadow-teal-950/5"
                    data-aos="fade-up"
                >
                    {/* Soft background glow */}
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Hero Text */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex flex-wrap gap-2.5">
                                <span className="inline-flex items-center gap-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                    <LuTag size={12} />
                                    {project.category}
                                </span>
                                <span className="inline-flex items-center gap-1 bg-gray-800/60 text-gray-300 border border-gray-800/50 px-3 py-1 rounded-full text-xs font-semibold">
                                    <LuCalendar size={12} className="text-teal-400" />
                                    {project.date}
                                </span>
                                <span className="inline-flex items-center gap-1 bg-gray-800/60 text-gray-300 border border-gray-800/50 px-3 py-1 rounded-full text-xs font-semibold">
                                    <LuClock size={12} className="text-cyan-400" />
                                    {readTime} Min Read
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display bg-gradient-to-r from-white via-gray-150 to-gray-400 bg-clip-text text-transparent">
                                {project.title}
                            </h1>

                            <p className="text-gray-300 leading-relaxed text-[15px] md:text-base max-w-2xl font-medium">
                                {project.summary}
                            </p>
                        </div>

                        {/* Showcase Image Container */}
                        {project.image && (
                            <div className="lg:col-span-5 relative w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-2xl overflow-hidden border border-gray-800/60 shadow-2xl group hover:shadow-teal-500/10 transition-all duration-500">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/30 via-transparent to-transparent"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Grid Layout for Content & Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Content (left 8 columns) */}
                    <div className="lg:col-span-8">
                        <div data-aos="fade-up" data-aos-delay="100">
                            <article className="prose prose-invert max-w-none markdown glass-card p-6 md:p-10 lg:p-12 rounded-3xl border border-gray-800/40 shadow-2xl">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        h2: ({ node, ...props }) => {
                                            void node;
                                            return <h2 className="text-2xl font-bold font-display text-white mt-10 mb-4 border-l-4 border-teal-500 pl-3.5" {...props} />;
                                        },
                                        h3: ({ node, ...props }) => {
                                            void node;
                                            return <h3 className="text-xl font-bold font-display text-white mt-8 mb-3 border-l-2 border-teal-500/40 pl-2.5" {...props} />;
                                        },
                                        p: ({ node, ...props }) => {
                                            void node;
                                            return <p className="text-gray-300 leading-relaxed mb-5 text-[15px] md:text-base font-normal" {...props} />;
                                        },
                                        ul: ({ node, ...props }) => {
                                            void node;
                                            return <ul className="list-none space-y-3.5 mb-6 pl-1" {...props} />;
                                        },
                                        li: ({ node, ...props }) => {
                                            void node;
                                            return (
                                                <li className="flex items-start gap-3 text-gray-300 text-[15px] md:text-base">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2.5 shrink-0 animate-pulse"></span>
                                                    <span className="flex-1 leading-relaxed">{props.children}</span>
                                                </li>
                                            );
                                        },
                                        a: ({ node, ...props }) => {
                                            void node;
                                            const isBadge = typeof props.href === "string" && (props.href.includes("play.google.com") || (typeof props.className === "string" && props.className.includes("badge")));
                                            if (isBadge) {
                                                return (
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block transition-transform duration-300 hover:scale-[1.03]"
                                                        {...props}
                                                    />
                                                );
                                            }
                                            return (
                                                <a
                                                    className="inline-flex items-center gap-1 text-teal-400 font-semibold hover:text-teal-300 transition-colors border-b border-dashed border-teal-500/30 hover:border-teal-400 pb-0.5"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    {...props}
                                                />
                                            );
                                        },
                                        img: ({ node, alt, ...props }) => {
                                            void node;
                                            const isBadge = alt === "Get it on Google Play" || (typeof props.src === "string" && (props.src.includes("badge") || props.src.includes("play.google.com")));
                                            if (isBadge) {
                                                return (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img className="h-[46px] sm:h-[54px] max-w-full w-auto inline-block hover:opacity-95 transition-opacity my-2 object-contain" alt={alt || "Project Image"} {...props} />
                                                );
                                            }
                                            return (
                                                <span className="block my-8 rounded-2xl overflow-hidden border border-gray-800/60 shadow-xl shadow-teal-950/5 group hover:border-teal-500/25 transition-all duration-500 transform hover:scale-[1.005]">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img className="w-full h-auto object-cover max-h-[500px]" alt={alt || "Project Image"} {...props} />
                                                </span>
                                            );
                                        },
                                        iframe: ({ node, ...props }) => {
                                            void node;
                                            let src = props.src;
                                            if (typeof src === "string") {
                                                if (src.includes("youtube.com/shorts/")) {
                                                    src = src.replace("youtube.com/shorts/", "youtube.com/embed/");
                                                } else if (src.includes("youtu.be/")) {
                                                    const id = src.split("/").pop()?.split("?")[0];
                                                    src = `https://www.youtube.com/embed/${id}`;
                                                } else if (src.includes("youtube.com/watch?v=")) {
                                                    try {
                                                        const urlObj = new URL(src);
                                                        const v = urlObj.searchParams.get("v");
                                                        if (v) {
                                                            src = `https://www.youtube.com/embed/${v}`;
                                                        }
                                                    } catch {
                                                        // Fallback if URL parsing fails
                                                        const match = src.match(/[?&]v=([^&#]+)/);
                                                        if (match) {
                                                            src = `https://www.youtube.com/embed/${match[1]}`;
                                                        }
                                                    }
                                                }
                                            }

                                            const isYoutube = typeof src === "string" && (src.includes("youtube.com") || src.includes("youtu.be"));
                                            const widthVal = parseInt(String(props.width || ""));
                                            const heightVal = parseInt(String(props.height || ""));
                                            const isVertical = (widthVal && heightVal && heightVal > widthVal) ||
                                                (typeof props.src === "string" && (props.src.includes("/shorts/") || props.src.includes("O2S1L_jSC8o"))) ||
                                                props.className?.includes("short");

                                            // Strip out hardcoded width/height to let the container control responsiveness
                                            const { width: _w, height: _h, ...cleanProps } = props;
                                            void _w;
                                            void _h;

                                            if (isYoutube && isVertical) {
                                                return (
                                                    <div className="flex justify-center my-6">
                                                        <div className="w-full max-w-[280px] sm:max-w-[315px] aspect-[9/16] rounded-3xl overflow-hidden border border-gray-800/80 shadow-2xl shadow-teal-950/20 hover:border-teal-500/30 transition-all duration-500 transform hover:scale-[1.01]">
                                                            <iframe
                                                                src={src}
                                                                className="w-full h-full"
                                                                title={props.title || "YouTube Shorts Player"}
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                allowFullScreen
                                                                {...cleanProps}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div className="overflow-hidden rounded-2xl border border-gray-800/60 shadow-xl my-8 aspect-video w-full">
                                                    <iframe
                                                        src={src}
                                                        className="w-full h-full"
                                                        title={props.title || "Video Player"}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen
                                                        {...cleanProps}
                                                    />
                                                </div>
                                            );
                                        },
                                        table: ({ node, ...props }) => {
                                            void node;
                                            return (
                                                <div className="overflow-x-auto my-8 rounded-xl border border-gray-800/40 bg-gray-900/10 backdrop-blur-sm shadow-inner">
                                                    <table className="w-full text-left border-collapse text-sm" {...props} />
                                                </div>
                                            );
                                        },
                                        th: ({ node, ...props }) => {
                                            void node;
                                            return <th className="p-4 bg-gray-800/30 text-teal-400 font-bold border-b border-gray-800/50" {...props} />;
                                        },
                                        td: ({ node, ...props }) => {
                                            void node;
                                            return <td className="p-4 border-b border-gray-800/20 text-gray-300" {...props} />;
                                        },
                                        hr: ({ node, ...props }) => {
                                            void node;
                                            return <hr className="my-10 border-0 h-[1.5px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" {...props} />;
                                        },
                                    }}
                                >
                                    {markdownContent}
                                </ReactMarkdown>
                            </article>
                        </div>
                    </div>

                    {/* Sidebar (right 4 columns) */}
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="sticky top-24 space-y-6">

                            {/* Profile Card */}
                            <div data-aos="fade-left" data-aos-delay="100">
                                <ProfileCard />
                            </div>


                            {/* Action Card (Dynamic CTA Links) */}
                            <div
                                className="glass-card rounded-2xl p-6 border border-gray-800/40 space-y-5 shadow-xl"
                                data-aos="fade-left"
                                data-aos-delay="150"
                            >
                                <h4 className="text-md font-bold text-white font-display border-b border-gray-800/50 pb-2.5 flex items-center gap-2">
                                    <LuBookmark className="text-teal-400" size={18} />
                                    Actions & Resources
                                </h4>
                                <div className="flex flex-col gap-3">
                                    {actions.length > 0 ? (
                                        actions.map((act, aIdx) => {
                                            const getIcon = (type: string) => {
                                                switch (type) {
                                                    case "github": return <LuGithub size={16} />;
                                                    case "youtube": return <LuYoutube size={16} />;
                                                    case "website":
                                                    case "demo":
                                                    case "live": return <LuGlobe size={16} />;
                                                    case "playstore": return <LuGamepad2 size={16} />;
                                                    case "journal":
                                                    case "paper": return <LuBookOpen size={16} />;
                                                    default: return <LuLink size={16} />;
                                                }
                                            };

                                            return (
                                                <a
                                                    key={aIdx}
                                                    href={act.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white hover:shadow-teal-500/10"
                                                >
                                                    {getIcon(act.type)}
                                                    {act.label}
                                                </a>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-4 bg-gray-500/5 rounded-xl border border-dashed border-gray-850">
                                            <span className="text-xs text-gray-400 font-medium block">Project links are available inside the article</span>
                                        </div>
                                    )}

                                    <Link
                                        href="/#proyek"
                                        className="w-full inline-flex items-center justify-center gap-2 border border-gray-805 hover:border-teal-500/40 bg-gray-900/20 hover:bg-gray-850/40 text-gray-400 hover:text-teal-400 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                                    >
                                        <LuArrowLeft size={16} />
                                        Back to Portfolio
                                    </Link>
                                </div>
                            </div>

                            {/* Meta Details Card */}
                            <div
                                className="glass-card rounded-2xl p-6 border border-gray-800/40 space-y-4 shadow-xl"
                                data-aos="fade-left"
                                data-aos-delay="250"
                            >
                                <h4 className="text-md font-bold text-white font-display border-b border-gray-800/50 pb-2.5 flex items-center gap-2">
                                    <LuCpu className="text-teal-400" size={18} />
                                    Project Information
                                </h4>
                                <div className="space-y-3.5 text-sm">
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-xs text-gray-400 font-medium">Project Period</span>
                                        <span className="text-gray-200 font-semibold">{project.date}</span>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-xs text-gray-400 font-medium">Main Category</span>
                                        <span className="text-gray-200 font-semibold">{project.category}</span>
                                    </div>
                                </div>
                            </div>


                            {/* Tech Stack Card (Dynamic Tag Lists) */}
                            {techStack.length > 0 && (
                                <div
                                    className="glass-card rounded-2xl p-6 border border-gray-800/40 space-y-4 shadow-xl"
                                    data-aos="fade-left"
                                    data-aos-delay="200"
                                >
                                    <h4 className="text-md font-bold text-white font-display border-b border-gray-800/50 pb-2.5 flex items-center gap-2">
                                        <LuLayers className="text-teal-400" size={18} />
                                        Related Technologies
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {techStack.map((tech, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="inline-block px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-500/5 border border-teal-500/10 text-teal-300/90 shadow-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}



                        </div>
                    </aside>

                </div>
            </main>
        </>
    );
}