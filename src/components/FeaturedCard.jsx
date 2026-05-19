import { Chip, Button } from "@heroui/react";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeaturedCard = ({ idea }) => {
    const { _id, thumbnail, title, price, category, shortDescription, instructor } = idea;


    return (
        // <div
        //     className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        // >
        //     <div className="relative aspect-16/10 overflow-hidden">
        //         <Image src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600'}

        //             alt="Idea Image"
        //             height={400}
        //             width={640}
        //             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        //             className="object-cover group-hover:scale-110 transition-transform duration-700"
        //         />
        //         <div className="absolute top-3 right-3">
        //             <Chip
        //                 size="sm"
        //                 color="primary"
        //                 variant="solid"
        //                 className="font-bold text-[10px] uppercase"
        //             >
        //                 {category}
        //             </Chip>
        //         </div>
        //     </div>
        //     <div className="p-5 flex flex-col grow space-y-3">
        //         <Link href={`/ideas/${_id}`}>
        //             <h4 className="font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
        //                 {title}
        //             </h4>
        //         </Link>
        //         <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        //             <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
        //                 <Users className="w-3 h-3" />
        //                 <span>0</span>
        //             </div>
        //             <span className="font-black text-blue-600">${price}</span>
        //         </div>
        //     </div>
        // </div>

        <div
            className="group flex flex-col bg-white rounded-4xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="relative overflow-hidden aspect-16/10">
                <Image
                    alt="Idea Image"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}

                    fill
                />
                <div className="absolute top-4 right-4">
                    <Chip
                        color="primary"
                        variant="solid"
                        className="font-bold shadow-lg shadow-blue-600/20"
                    >
                        {category}
                    </Chip>
                </div>
            </div>
            <div className="p-8 flex flex-col grow space-y-4">
                <div className="space-y-2">
                    <Link href={`/ideas/${_id}`}>
                        <h3 className="text-xl font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                            {title}
                        </h3>
                    </Link>
                    <p className="mt-4 text-sm font-medium flex items-center">
                        {shortDescription}
                    </p>
                    {/* <p >{shortDescription}</p> */}
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                    {/* <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> {duration}
                            </span> */}
                    By <span className="text-slate-900">{instructor}</span>
                </div>

                <div className="pt-6 mt-auto border-t border-slate-100 flex justify-between items-center">
                    {/* <span className="text-2xl font-black text-blue-600">${price}</span> */}

                    <Link href={`/ideas/${_id}`}>
                        <Button
                            // variant="flat"
                            color="primary"
                            className="font-bold rounded-xl px-6"
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