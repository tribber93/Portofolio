import AllProjectsClient from "./AllProjectsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Projects | Yoni Tribber Portfolio",
    description: "Full list of Yoni Tribber's portfolio projects - Data Scientist & AI Developer. Showcasing AI, Machine Learning, Web, and Mobile projects.",
};

export default function ProjectIndexPage() {
    return <AllProjectsClient />;
}
