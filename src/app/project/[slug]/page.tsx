// src/app/project/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Footer from "../../components/footer";
import projects from "../../data/projectsData.json";
import ProfileCard from "@/app/components/cards";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import fs from "fs/promises";
import path from "path";
import rehypeRaw from "rehype-raw";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// ✅ Pola ini sudah benar sesuai dokumentasi terbaru
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params; // await untuk akses asinkron
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
        description: project.summary ?? "Project details and description",
        openGraph: {
            images: project.image ? [project.image, ...previousImages] : previousImages,
        },
    };
}

// ✅ Static path generation untuk semua slug project
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
        return "Content not available.";
    }
}

// ✅ Komponen halaman utama detail project
export default async function DetailProjectPage({ params }: Props) {
    // [PERBAIKAN] Menggunakan 'await' untuk mengakses params sesuai dokumentasi Next.js 15
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return notFound();
    }

    const markdownContent = await getMarkdownContent(project.content);

    return (
        <>
            {/* Breadcrumb */}
            <nav className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 px-6 py-4 z-50">
                <div className="max-w-6xl mx-auto flex items-center space-x-2 text-sm text-gray-400">
                    <Link href="/" className="hover:text-teal-400">Beranda</Link>
                    <span>/</span>
                    <Link href="/#projects" className="hover:text-teal-400">Projects</Link>
                    <span>/</span>
                    <span className="text-white">{project.title}</span>
                </div>
            </nav>

            <main className="pt-24 px-6 md:px-12 max-w-6xl mx-auto md:pr-[22rem]">
                <div className="flex flex-col md:flex-row md:space-x-8">
                    {/* Konten utama */}
                    <section className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                        <p className="text-gray-400 mb-1">Kategori: {project.category}</p>
                        <p className="text-gray-400 mb-6">Date: {project.date}</p>

                        {project.image && (
                            <div className="relative w-full h-100 rounded-lg overflow-hidden mb-6">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 512px) 100vw, 600px"
                                />
                            </div>
                        )}

                        <article className="prose dark:prose-invert max-w-none markdown">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {markdownContent}
                            </ReactMarkdown>
                        </article>
                    </section>

                    {/* Profile Card (Mobile) */}
                    <aside className="block md:hidden mt-10">
                        <ProfileCard />
                    </aside>
                </div>
            </main>

            <Footer />

            {/* Profile Card (Desktop kanan) */}
            <aside className="hidden md:block fixed top-1/2 right-6 transform -translate-y-1/2 w-80 z-40">
                <ProfileCard />
            </aside>
        </>
    );
}