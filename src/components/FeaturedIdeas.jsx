import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import FeaturedCard from "./FeaturedCard";
import { fetchFeaturedIdeas } from "@/lib/ideas/data";

const FeaturedIdeas = async () => {
    const ideas = await fetchFeaturedIdeas();

    return (
        <section className="py-24 bg-slate-50 dark:bg-[#0b0f19] border-t border-b border-transparent dark:border-gray-800/40 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Container Layout */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="space-y-4 text-left">
                        <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm transition-colors">
                            Top Rated
                        </h2>
                        <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white transition-colors">
                            Trending Ideas
                        </h3>
                    </div>
                    
                    <Button
                        variant="flat"
                        color="primary"
                        className="rounded-full font-bold group bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 cursor-pointer"
                    >
                        Explore All Ideas{" "}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                {/* Cards Responsive Grid Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ideas?.map((idea) => (
                        <FeaturedCard key={idea?._id} idea={idea} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedIdeas;