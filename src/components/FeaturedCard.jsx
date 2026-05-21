import { Chip, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const FeaturedCard = ({ idea }) => {
    const { _id, thumbnail, title, category, shortDescription, instructor } = idea;

    return (
        <div
            className="group flex flex-col bg-white dark:bg-gray-900/40 backdrop-blur-md rounded-4xl border border-slate-200 dark:border-gray-800/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-blue-500/5 hover:border-slate-300 dark:hover:border-gray-700"
        >
            {/* Thumbnail Header Aspect Box */}
            <div className="relative overflow-hidden aspect-16/10">
                <Image
                    alt="Idea Image Thumbnail"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}
                    fill
                />
                {/* Floating Tag Badge Overlay */}
                <div className="absolute top-4 right-4">
                    <Chip
                        color="primary"
                        variant="solid"
                        className="font-bold shadow-lg shadow-blue-600/20 dark:shadow-blue-500/10"
                    >
                        {category}
                    </Chip>
                </div>
            </div>

            {/* Core Details Frame Content */}
            <div className="p-8 flex flex-col grow space-y-4 text-left">
                <div className="space-y-2">
                    <Link href={`/ideas/${_id}`}>
                        <h3 className="text-xl font-bold leading-tight line-clamp-2 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {title}
                        </h3>
                    </Link>
                    <p className="mt-4 text-sm font-medium text-slate-500 dark:text-gray-400 min-h-[40px] line-clamp-2 transition-colors">
                        {shortDescription}
                    </p>
                </div>

                {/* Author Metadata Frame */}
                <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-gray-500 font-bold transition-colors">
                    By <span className="text-slate-900 dark:text-gray-300 transition-colors">{instructor}</span>
                </div>

                {/* Footer Operational Frame Element */}
                <div className="pt-6 mt-auto border-t border-slate-100 dark:border-gray-800/60 flex justify-between items-center">
                    <Link href={`/ideas/${_id}`} className="w-full">
                        <Button
                            className="w-full sm:w-auto font-bold rounded-xl px-6 text-white bg-gradient-to-r from-[#1d63ed] via-[#653df5] to-[#a426e7] hover:opacity-90 active:scale-[0.98] shadow-md shadow-purple-500/20 transition-all duration-300 cursor-pointer"
                        >
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCard;