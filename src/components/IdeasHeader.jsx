import SearchBar from "./SearchBar";

const IdeasHeader = () => {
    return (
        <header className="bg-white dark:bg-[#0b0f19]/80 dark:backdrop-blur-md border-b border-slate-200 dark:border-gray-800/40 py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white transition-colors">
                    Explore Our{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1d63ed] via-[#653df5] to-[#a426e7]">
                        Premium
                    </span>{' '}
                    Ideas
                </h1>
                <p className="text-xl text-slate-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                    Find the perfect idea to inspire your next venture. Learn from the best innovators in the field.
                </p>

                <div className="max-w-2xl mx-auto pt-4">
                    <SearchBar />
                </div>
            </div>
        </header>
    );
};

export default IdeasHeader;