import IdeaCard from "@/components/IdeaCard";
import IdeasHeader from "@/components/IdeasHeader";
import { fetchIdeas } from "@/lib/ideas/data";
import { Button } from "@heroui/react";
import { BookOpen, Filter } from "lucide-react";

export const metadata = {
    title: "Ideas",
};


const IdeasPage = async ({ searchParams }) => {
    // console.log(searchParams);
    const sParams = await searchParams;
    // console.log(sParams);


    const ideas = await fetchIdeas(sParams?.searchTerm || "", sParams?.category || "");


    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-white transition-colors duration-300">
            {/* Header */}
            <IdeasHeader />

            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Dashboard Sub-Header section */}
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white transition-colors">
                        <BookOpen className="w-6 h-6 text-blue-600 dark:text-purple-400 transition-colors" />
                        All Ideas
                    </h2>

                    <Button
                        variant="flat"
                        startContent={<Filter className="w-4 h-4" />}
                        className="rounded-full font-bold bg-slate-200/60 dark:bg-zinc-800/60 text-slate-700 dark:text-zinc-300 border border-transparent dark:border-slate-800/50 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                    >
                        Filters
                    </Button>
                </div>

                {/* Main Content Grid Area */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        ideas?.map((idea) => (
                            <IdeaCard key={idea._id} idea={idea} />
                        ))
                    }
                </div> */}
                {/* ----------------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ideas?.length > 0 ? (
                        ideas.map((idea) => (
                            <IdeaCard key={idea._id} idea={idea} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-white">
                                No Idea Found
                            </h2>
                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                Try searching with a different keyword or category.
                            </p>
                        </div>
                    )}
                </div>
                {/* ----------------- */}


            </main>
        </div>
    );
};

export default IdeasPage;