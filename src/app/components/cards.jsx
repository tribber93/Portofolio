import Image from "next/image";
import Link from "next/link";
import myData from "../data/myData.json";

export default function ProfileCard() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-gray-800/50 shadow-xl flex flex-col items-center">
      <div className="flex flex-col items-center text-center">
        <img
          src={myData.picture}
          alt={`Profil ${myData.name}`}
          className="w-24 h-24 rounded-full border-2 border-teal-500 object-cover mb-4 shadow-sm"
        />
        <h3 className="text-lg font-bold text-white font-display">{myData.name}</h3>
        <p className="text-sm text-gray-300 mt-1">ML Engineer | Web Developer</p>
      </div>
      <div className="mt-4 text-center space-y-2 w-full border-t border-gray-800/30 pt-4">
        <p className="text-sm text-gray-300">
          Email:{" "}
          <a href={`mailto:${myData.email}`} className="text-teal-400 font-medium hover:underline">
            {myData.email}
          </a>
        </p>
        <div className="flex justify-center space-x-4 mt-3">
          <a
            href="https://github.com/yonitribber"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-teal-400 transition-colors"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="w-6 h-6 invert"
            />
          </a>
          <a
            href="https://linkedin.com/in/yonitribber"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-teal-400 transition-colors"
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
    <div className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
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
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-300">
          {summary}
        </p>
        <Link
          href={`/project/${slug}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-850"
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
