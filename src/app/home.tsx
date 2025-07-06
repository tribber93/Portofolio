"use client";

import Image from "next/image";
import myData from "./data/myData.json";
import { FaLinkedin, FaGithub, FaEnvelope, } from "react-icons/fa";
import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiDocker,
  SiGit,
  SiPhp,
  SiJavascript,
  SiFlutter,
  SiKeras,
  SiScikitlearn,
  SiOpenai,
  SiHuggingface,
  SiFastapi,
  SiGooglegemini
} from "react-icons/si";

import { ProjectCard } from "./components/cards";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProjectCardSkeleton } from "./components/skeletons";

// import Swiper core and required modules
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Footer from "./components/footer";
import projects from "./data/projectsData.json";

export default function Home() {

  const skills = [
    { name: "Python", icon: <SiPython />, color: "text-teal-400" },
    { name: "TensorFlow", icon: <SiTensorflow />, color: "text-teal-400" },
    { name: "PyTorch", icon: <SiPytorch />, color: "text-teal-400" },
    { name: "Keras", icon: <SiKeras />, color: "text-teal-400" },
    { name: "scikit-learn", icon: <SiScikitlearn />, color: "text-teal-400" },
    { name: "OpenAI", icon: <SiOpenai />, color: "text-teal-400" },
    { name: "Google Gemini", icon: <SiGooglegemini />, color: "text-teal-400" },
    { name: "Hugging Face", icon: <SiHuggingface />, color: "text-teal-400" },
    { name: "FastAPI", icon: <SiFastapi />, color: "text-teal-400" },
    { name: "Docker", icon: <SiDocker />, color: "text-teal-400" },
    { name: "Git", icon: <SiGit />, color: "text-teal-400" },
    { name: "PHP", icon: <SiPhp />, color: "text-teal-400" },
    { name: "JavaScript", icon: <SiJavascript />, color: "text-teal-400" },
    { name: "Flutter", icon: <SiFlutter />, color: "text-teal-400" },
  ];

  const certificates = [
    {
      name: "TensorFlow Developer Certificate",
      issuer: "TensorFlow",
      year: 2023,
      description: "Official certification that validates proficiency in developing deep learning models using TensorFlow.",
      image: "/certificates/tfd_certificate.jpg",
      link: "https://www.credential.net/53bf9287-fcca-4c5d-bdb2-0f218abe8701"
    },
    {
      name: "Bangkit Academy Graduate",
      issuer: "Google & Partners",
      year: 2023,
      description: "Completed intensive program in Machine Learning path, covering deep learning, cloud computing, and soft skills.",
      image: "/certificates/bangkit.jpg",
    },
    {
      name: "Best Thesis in the Informatics Engineering Program",
      issuer: "Universitas Catur Insan Cendekia",
      year: 2024,
      description: "Awarded for Best Thesis in the Informatics Engineering Program, recognizing outstanding research and innovation.",
      image: "/certificates/skripsi-terbaik.jpeg",
    },
    {
      name: "MSIB Internship Program - Machine Learning Engineer",
      issuer: "PT. Inti Utama Solusindo",
      year: 2023,
      description: "Completed the Kampus Merdeka MSIB internship program as a Machine Learning Engineer, focusing on AI chatbot development using LLM and Retrieval-Augmented Generation.",
      image: "/certificates/msib-intiutama.jpg",
    }

    // Tambahkan sertifikat lain di sini
  ];


  return (
    <>
      <nav className="hidden md:flex flex-col fixed top-0 left-0 h-full w-56 bg-gray-800 p-6 gap-6 border-r border-gray-700 z-50">
        <a href="#about" className="text-gray-300 hover:bg-teal-400 hover:text-gray-900 rounded px-4 py-2">About</a>
        <a href="#projects" className="text-gray-300 hover:bg-teal-400 hover:text-gray-900 rounded px-4 py-2">Projects</a>
        <a href="#skills" className="text-gray-300 hover:bg-teal-400 hover:text-gray-900 rounded px-4 py-2">Skills</a>
        <a href="#certifications" className="text-gray-300 hover:bg-teal-400 hover:text-gray-900 rounded px-4 py-2">Certifications</a>
      </nav>
      <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around py-4 z-50">
        <a href="#about" className="text-gray-300 hover:text-teal-400">About</a>
        <a href="#projects" className="text-gray-300 hover:text-teal-400">Projects</a>
        <a href="#skills" className="text-gray-300 hover:text-teal-400">Skills</a>
        <a href="#certifications" className="text-gray-300 hover:text-teal-400">Certifications</a>
      </nav>
      <div className="md:ml-56 px-6 md:px-12 pt-8 pb-24">
        <header className="text-center mb-12">

          <Image src={"/yoni.jpg"} alt={"Profile Picture"} width={120} height={120} className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-teal-400 mx-auto mb-4 object-cover" />
          <h1 className="text-3xl font-bold">Yoni Tribber</h1>
          <p className="text-gray-400">ML Engineer | Web Developer | Data Enthusiast</p>
          {/* Kontak icons */}
          <div className="mt-8 flex justify-center space-x-6 text-gray-400 dark:text-gray-300">
            <a
              href="https://linkedin.com/in/yonitribber"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-teal-400"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/tribber93"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-teal-400"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://huggingface.co/tribber93"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hugging Face"
              className="hover:text-teal-400"
            >
              <SiHuggingface size={24} />
            </a>
            <a
              href={`mailto:${myData.email}`}
              aria-label="Email"
              className="hover:text-teal-400"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </header>

        <section id="about" className="mb-16">
          <h2 className="text-2xl border-b-2 border-teal-400 pb-1 mb-4 font-semibold">About Me</h2>
          <p>I am a fresh graduate in Information Engineering with a strong passion for technology, particularly in Data Science and
            Machine Learning. I graduated from Bangkit Academy in 2023 with a global TensorFlow certification. I have experience
            working on projects that involve integrating external data sources, building efficient search systems, and leveraging machine
            learning models to deliver precise and contextual insights. I am eager to continuously develop my skills and contribute to
            innovative projects in the field of data-driven solutions and intelligent systems.
          </p>
        </section>

        <section id="projects" className="mb-16">
          <h2 className="text-2xl border-b-2 border-teal-400 pb-1 mb-6 font-semibold">Projects</h2>
          <div className="mb-10">
            <h3 className="text-xl text-teal-400 font-semibold mb-3">AI/Data/ML Projects</h3>

            {/* <ProjectCardSkeleton /> */}
            <Swiper
              modules={[Pagination, Scrollbar, A11y]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-12"
            >
              {projects
                .filter((project) => project.category === "AI/Data/ML")
                .map((project) => (
                  <SwiperSlide key={project.slug}>
                    <div className="w-full max-w-sm mx-auto">
                      <ProjectCard {...project} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

          </div>


          <div className="mb-10">
            <h3 className="text-xl text-teal-400 font-semibold mb-3">Web Projects</h3>

            {/* <ProjectCardSkeleton /> */}
            <Swiper
              modules={[Pagination, Scrollbar, A11y]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-12"
            >
              {projects
                .filter((project) => project.category === "Web")
                .map((project) => (
                  <SwiperSlide key={project.slug}>
                    <div className="w-full max-w-sm mx-auto">
                      <ProjectCard {...project} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

          </div>

          <div className="mb-10">
            <h3 className="text-xl text-teal-400 font-semibold mb-3">Mobile Projects</h3>

            <Swiper
              modules={[Pagination, Scrollbar, A11y]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-12"
            >
              {projects
                .filter((project) => project.category === "Mobile")
                .map((project) => (
                  <SwiperSlide key={project.slug}>
                    <div className="w-full max-w-sm mx-auto">
                      <ProjectCard {...project} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </section>

        <section id="skills" className="mb-16">
          <h2 className="text-2xl border-b-2 border-teal-400 pb-1 mb-6 font-semibold text-white">Skills</h2>
          <div className="flex flex-wrap justify-center gap-10 text-gray-400">
            {skills.map(({ name, icon, color }) => (
              <div
                key={name}
                className={`flex flex-col items-center cursor-default transition duration-300 hover:text-opacity-100 hover:${color} text-opacity-60 basis-1/6 max-w-[100px]`}
                title={name}
              >
                <div className="text-5xl mb-2">{icon}</div>
                <span className="text-sm select-none">{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="mb-16">
          <h2 className="text-2xl border-b-2 border-teal-400 pb-1 mb-6 font-semibold text-white">Certifications</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="relative w-40 h-40 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      style={{ objectFit: "contain" }}
                      className="rounded-lg bg-white p-2"
                      sizes="160px"
                      priority={true}
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-white">{cert.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Issued by {cert.issuer} · {cert.year}
                    </p>
                    <p className="text-gray-300 text-sm mt-2">{cert.description}</p>

                    {cert.link && cert.link.trim() !== "" && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-sm text-teal-400 underline hover:text-teal-300 transition"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
