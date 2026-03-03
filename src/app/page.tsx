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
              <h2 className="text-4xl font-bold mb-4">
                Halo! Saya Yoni Tribber
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Seorang Data Scientist & AI Developer
              </p>
              <a
                href="#pengalaman"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition duration-300"
              >
                Lihat Portofolio
              </a>
            </div>

            {/* <!-- Gambar --> */}
            <div className="md:w-1/2 flex justify-center mb-4 md:mb-0 md:h-100 w-64 h-64">
              {/* <div className="md:w-100 md:h-100 w-64 h-64"> */}
              <Image
                src="/download.png"
                alt="Foto Profil"
                width={720} // ubah sesuai kebutuhan
                height={720} // ubah sesuai kebutuhan
                className="max-w-full h-auto object-contain"
                data-aos="zoom-in"
              />
              {/* </div> */}
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
              <li key={idx} className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {exp.date}
                </time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {exp.title}
                </h3>
                <h6 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                  {exp.company}
                </h6>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {exp.description.split('\n').map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </p>
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
                  <div className="mt-3 sm:pe-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <div className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {edu.institution}
                    </div>
                    <div className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {edu.year && `${edu.year}`}
                    </div>
                    {edu.ipk && edu.ipk !== "-" ? (
                      <div className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        IPK: {edu.ipk}
                      </div>
                    ) : (
                      <div className="block mb-2 text-sm font-normal leading-none invisible">
                        IPK Placeholder
                      </div>
                    )}
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
              <li key={idx} className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {org.date}
                </time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {org.name}
                </h3>
                <h6 className="text-base font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  {org.role}
                </h6>
                <ul className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 list-disc ps-5">
                  {org.description.split('\n').map((item, i) => (
                    <li key={i}>{item.replace(/^●\s?/, '')}</li>
                  ))}
                </ul>
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
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
              // HAPUS: style={{ minHeight: 350 }}
              >
                <div className="flex-1">
                  <a href={project.content}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {project.title}
                    </h5>
                  </a>
                  <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">{project.date}</p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {project.summary}
                  </p>
                </div>
                <div>
                  <a
                    href={project.content}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 mt-4"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
          <ul>
            <li>TensorFlow Developer Certificate (2023)</li>
            <li>Bangkit Academy - Machine Learning (2023)</li>
            <li>TensorFlow Developer Certificate (2023)</li>
            <li>Bangkit Academy - Machine Learning (2023)</li>
            <li>TensorFlow Developer Certificate (2023)</li>
            <li>Bangkit Academy - Machine Learning (2023)</li>
            <li>TensorFlow Developer Certificate (2023)</li>
            <li>Bangkit Academy - Machine Learning (2023)</li>
            <li>TensorFlow Developer Certificate (2023)</li>
            <li>Bangkit Academy - Machine Learning (2023)</li>
            <li>TensorFlow Developer Certificate (2023)</li>
            <li>Bangkit Academy - Machine Learning (2023)</li>
            <li>TensorFlow Developer Certificate (2023)</li>
            <li>Bangkit Academy - Machine Learning (2023)</li>
          </ul>
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
