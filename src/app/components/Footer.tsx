export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="border-t border-gray-200/30 dark:border-gray-800/30 bg-white/30 dark:bg-[#0b0f19]/30 backdrop-blur-md py-8 mt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    &copy; {currentYear} Yoni Tribber. All rights reserved.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                    <a href="#hero" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        Home
                    </a>
                    <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        About
                    </a>
                    <a href="#skill" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        Skills
                    </a>
                    <a href="#proyek" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        Projects
                    </a>
                    <a href="#history" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        History
                    </a>
                    <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}
