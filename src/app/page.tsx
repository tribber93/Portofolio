import Image from "next/image";
import Skills from "@/app/data/skills";
import ParticleJS from "./components/particles";
import projectsData from "@/app/data/projectsData.json";
import myData from "@/app/data/myData.json";

export default function Home() {
  return (
    <>
      {/* <!-- Hero --> */}
      <section
        id="hero"
        className="h-screen bg-gradient-to-r from-teal-100 to-teal-200 dark:from-gray-800 dark:to-gray-900 flex items-center"
      >

        <ParticleJS />
        <div className="container mx-auto px-10">
          <div
            className="flex flex-col-reverse md:flex-row items-center justify-between w-full"
            data-aos="fade-up"
          >
            {/* <!-- Text --> */}
            <div className="md:w-1/2 text-center md:text-left mt-10 md:mt-0">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500 dark:from-teal-400 dark:to-cyan-300">
                Halo! Saya Yoni Tribber
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 font-medium">
                Seorang Data Scientist & AI Developer
              </p>
              <a
                href="#pengalaman"
                className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-teal-500/30 dark:hover:shadow-teal-400/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                Lihat Portofolio
              </a>
            </div>

            {/* <!-- Gambar --> */}
            <div className="md:w-1/2 flex justify-center mb-10 md:mb-0 relative py-12 md:py-24">
              {/* Glowing Background Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

              {/* Spinning decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] md:w-[360px] md:h-[360px] rounded-full border border-teal-500/30 border-dashed animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[290px] h-[290px] md:w-[380px] md:h-[380px] rounded-full border border-cyan-400/20 animate-[spin_15s_linear_infinite_reverse]"></div>

              <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-b from-teal-50 to-white dark:from-teal-900/40 dark:to-gray-900 p-2 shadow-2xl shadow-teal-500/30 flex items-center justify-center overflow-hidden border-4 border-white/60 dark:border-gray-800/60 backdrop-blur-md group">
                <Image
                  src="/download.png"
                  alt="Foto Profil"
                  width={720}
                  height={720}
                  className="w-[95%] h-[95%] object-cover rounded-full filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
                  data-aos="zoom-in"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Pengalaman --> */}
      <section
        id="pengalaman"
        className="py-16 bg-white dark:bg-gray-900"
        data-aos="fade-right"
      >
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6">Pengalaman Kerja</h3>
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {myData["work experience"].map((exp, idx) => (
              <li key={idx} className="mb-10 ms-6 group">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-teal-900 group-hover:bg-teal-300 dark:group-hover:bg-teal-700 transition-colors duration-300">
                  <svg className="w-2.5 h-2.5 text-teal-800 dark:text-teal-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 transform group-hover:-translate-y-1">
                  <time className="mb-2 block text-sm font-medium leading-none text-teal-600 dark:text-teal-400">
                    {exp.date}
                  </time>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {exp.title}
                  </h3>
                  <h6 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {exp.company}
                  </h6>
                  <ul className="text-base font-normal text-gray-600 dark:text-gray-400 list-disc ps-5 space-y-1">
                    {exp.description.split('\n').filter(item => item.trim() !== '').map((item, i) => (
                      <li key={i}>{item.replace(/^[-•●]\s?/, '')}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* <!-- Pendidikan --> */}
      <section
        id="pendidikan"
        className="py-16 bg-gray-100 dark:bg-gray-800"
        data-aos="fade-left"
      >
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6">Pendidikan</h3>
          <div className="flex justify-center">
            <ol className="items-center sm:flex sm:justify-center">
              {myData.education.map((edu, idx) => (
                <li key={idx} className="relative mb-6 sm:mb-0">
                  <div className="flex items-center">
                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full ring-0 ring-white dark:bg-teal-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                      <svg
                        className="w-2.5 h-2.5 text-teal-800 dark:text-teal-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                  </div>
                  <div className="mt-4 sm:pe-8 group cursor-pointer">
                    <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 transform group-hover:-translate-y-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {edu.degree}
                      </h3>
                      <div className="block mb-2 text-md font-medium text-teal-600 dark:text-teal-400">
                        {edu.institution}
                      </div>
                      <div className="flex items-center gap-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                          </svg>
                          {edu.year && `${edu.year}`}
                        </span>
                        {edu.ipk && edu.ipk !== "-" && (
                          <span className="flex items-center gap-1">
                            <strong className="text-gray-700 dark:text-gray-300">IPK:</strong> {edu.ipk}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* <!-- Organisasi --> */}
      <section
        id="organisasi"
        className="py-16 bg-white dark:bg-gray-900"
        data-aos="fade-right"
      >
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6">Organisasi</h3>
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {myData.organizations.map((org, idx) => (
              <li key={idx} className="mb-10 ms-6 group">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-teal-900 group-hover:bg-teal-300 dark:group-hover:bg-teal-700 transition-colors duration-300">
                  <svg className="w-3 h-3 text-teal-800 dark:text-teal-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                  </svg>
                </span>
                <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 transform group-hover:-translate-y-1">
                  <time className="mb-2 block text-sm font-medium leading-none text-teal-600 dark:text-teal-400">
                    {org.date}
                  </time>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {org.name}
                  </h3>
                  <h6 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {org.role}
                  </h6>
                  <ul className="text-base font-normal text-gray-600 dark:text-gray-400 list-disc ps-5 space-y-1">
                    {org.description.split('\n').filter(item => item.trim() !== '').map((item, i) => (
                      <li key={i}>{item.replace(/^[-•●]\s?/, '')}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* <!-- Proyek --> */}
      <section
        id="proyek"
        className="py-16 bg-gray-100 dark:bg-gray-800"
        data-aos="fade-left"
      >
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6">Proyek</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.slice(0, 3).map((project, idx) => (
              <div
                key={project.slug}
                className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-teal-500/20 dark:bg-gray-900 dark:border-gray-800 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex-1">
                  <a href={project.content}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                      {project.title}
                    </h5>
                  </a>
                  <p className="mb-2 text-xs font-semibold text-teal-600 dark:text-teal-400">{project.date}</p>
                  <p className="mb-3 font-normal text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.summary}
                  </p>
                </div>
                <div>
                  <a
                    href={project.content}
                    className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg hover:from-teal-700 hover:to-cyan-700 shadow-md transition-all duration-300 mt-4"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2 group-hover:translate-x-1 transition-transform duration-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* <!-- Tombol Proyek Lainnya --> */}
          <div className="mt-10 text-center">
            <a
              href="https://github.com/tribber?tab=repositories"
              target="_blank"
              className="inline-block px-6 py-3 text-sm font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition duration-300 dark:bg-teal-700 dark:hover:bg-teal-800"
            >
              Proyek Lainnya →
            </a>
          </div>
        </div>
      </section>

      {/* <!-- Sertifikat --> */}
      <section
        id="sertifikat"
        className="py-16 bg-white dark:bg-gray-900"
        data-aos="fade-right"
      >
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6">Sertifikat</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "TensorFlow Developer Certificate (2023)",
              "Bangkit Academy - Machine Learning (2023)",
              "TensorFlow Developer Certificate (2023)",
              "Bangkit Academy - Machine Learning (2023)",
              "TensorFlow Developer Certificate (2023)",
              "Bangkit Academy - Machine Learning (2023)",
              "TensorFlow Developer Certificate (2023)",
              "Bangkit Academy - Machine Learning (2023)",
              "TensorFlow Developer Certificate (2023)",
              "Bangkit Academy - Machine Learning (2023)",
              "TensorFlow Developer Certificate (2023)",
              "Bangkit Academy - Machine Learning (2023)",
              "TensorFlow Developer Certificate (2023)",
              "Bangkit Academy - Machine Learning (2023)"
            ].map((cert, idx) => (
              <div key={idx} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-1 cursor-default group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                </div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{cert}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- Skill --> */}
      <section
        id="skill"
        className="py-16 bg-gray-100 dark:bg-gray-800"
        data-aos="zoom-in"
      >
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6">Skill</h3>
          <Skills />
        </div>
      </section>
    </>
  );
}
