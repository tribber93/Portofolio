import Image from "next/image";
import Link from "next/link";
import myData from "../data/myData.json";

export default function ProfileCard() {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-6">
      <div className="flex flex-col items-center text-center">
        <img
          src={myData.picture}
          alt={`Profil ${myData.name}`}
          className="w-24 h-24 rounded-full border-2 border-teal-400 object-cover mb-4"
        />
        <h3 className="text-lg font-semibold">{myData.name}</h3>
        <p className="text-sm text-gray-400">ML Engineer | Web Developer</p>
      </div>
      <div className="mt-4 text-center space-y-1">
        <p>
          Email:{" "}
          <a href={`mailto:${myData.email}`} className="text-teal-400">
            {myData.email}
          </a>
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://github.com/yonitribber"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://linkedin.com/in/yonitribber"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ title, summary, image, slug }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href={`/project/${slug}`}>
        <Image
          src={image}
          alt={title}
          width={600}
          height={350}
          className="object-cover w-full h-48 rounded-lg p-0.5"
        />
      </a>
      <div className="p-5">
        <a href={`/project/${slug}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {summary}
        </p>
        <Link
          href={`/project/${slug}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
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
        </Link>
      </div>
    </div>
  );
}
