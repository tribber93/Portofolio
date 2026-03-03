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

export default function Skills() {
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

    return (
        <>
            {/* <h2 className="text-2xl border-b-2 border-teal-400 pb-1 mb-6 font-semibold text-white">Skills</h2> */}
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
        </>
    );
}