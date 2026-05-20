import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const IdeaCard = ({ idea }) => {
    const { _id, title, thumbnail, category, instructor, shortDescription } = idea;
    
    return (
        <div
            className="group flex flex-col bg-white dark:bg-[#0f1319] rounded-4xl border border-slate-200 dark:border-slate-800/80 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-purple-500/5"
        >
            {/* Thumbnail Box */}
            <div className="relative overflow-hidden aspect-16/10">
                <Image
                    alt="Idea Image"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}
                    fill
                />
                <div className="absolute top-4 right-4">
                    <Chip
                        variant="solid"
                        className="font-bold bg-blue-600 text-white dark:bg-zinc-800/80 dark:text-white dark:backdrop-blur-md border-transparent shadow-md"
                    >
                        {category}
                    </Chip>
                </div>
            </div>

            {/* Content Details Block */}
            <div className="p-8 flex flex-col grow space-y-4 text-left">
                <div className="space-y-2">
                    <Link href={`/ideas/${_id}`}>
                        <h3 className="text-xl font-bold leading-tight line-clamp-2 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {title}
                        </h3>
                    </Link>
                    <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 min-h-[40px] line-clamp-2 transition-colors">
                        {shortDescription}
                    </p>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 font-bold transition-colors">
                    By <span className="text-slate-900 dark:text-slate-300 transition-colors">{instructor}</span>
                </div>

                {/* Footer Action Segment */}
                <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center">
                    <Link href={`/ideas/${_id}`} className="w-full">
                        <Button
                            className="w-full sm:w-auto font-bold rounded-2xl px-8 text-white bg-gradient-to-r from-[#2b56f5] via-[#633df4] to-[#a624e5] hover:opacity-95 active:scale-[0.98] shadow-lg shadow-purple-600/20 transition-all duration-300 cursor-pointer"
                        >
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IdeaCard;