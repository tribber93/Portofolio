import AllProjectsClient from "./AllProjectsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Semua Proyek | Portofolio Yoni Tribber",
    description: "Daftar lengkap proyek portofolio Yoni Tribber - Data Scientist & AI Developer. Menampilkan proyek AI, Machine Learning, Web, dan Mobile.",
};

export default function ProjectIndexPage() {
    return <AllProjectsClient />;
}
