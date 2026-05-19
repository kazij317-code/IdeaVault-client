
import { Chip } from '@heroui/react';
import { BookOpen, Clock, BarChart, Users, AlertTriangle, CheckCircle2, Tag } from 'lucide-react';

import Image from 'next/image';
import CommentsSection from '@/components/CommentsSection';


const fetchSingleIdea = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`);
    
    const data = await res.json();
    return data || {};
}
export default async function IdeaDetails({ params }) {
   
    const { id } = await params;
    
    const idea = await fetchSingleIdea(id);
    const {
        _id,
        enrollCount,
        title,
        shortDescription,
        thumbnail,
        description,
        category,
        price,
        tags,
        targetAudience,
        problemStatement,
        proposedSolution,
        instructor
    } = idea;

    const featuredItems = [
        { icon: Clock, label: 'Active Idea' },
        { icon: BarChart, label: category || 'General' },
        { icon: Users, label: `${enrollCount || 0} Backers / Members` },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="space-y-8">
                <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video">
                    <Image
                        src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200'}
                        alt={title}
                        fill
                        className="object-cover transform transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6">
                        <Chip
                            color="primary"
                            variant="solid"
                            className="font-bold shadow-xl"
                        >
                            {category}
                        </Chip>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        {title}
                    </h1>

                    {shortDescription && (
                        <p className="text-xl font-bold text-blue-600 leading-normal">
                            {shortDescription}
                        </p>
                    )}

                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {description}
                    </p>
                </div>

                {/* Tags Badges */}
                {tags && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {tags.split(',').map((tag, idx) => (
                            <Chip
                                key={idx}
                                variant="flat"
                                size="sm"
                                color="secondary"
                                className="font-bold"
                                startContent={<Tag className="w-3.5 h-3.5 mr-0.5" />}
                            >
                                {tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`}
                            </Chip>
                        ))}
                    </div>
                )}

                {/* Technical Specification details: Target Audience, Problem Statement, Solution */}
                {(targetAudience || problemStatement || proposedSolution) && (
                    <div className="space-y-6 pt-8 border-t border-slate-200">
                        {targetAudience && (
                            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-2 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    Target Audience
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-medium">{targetAudience}</p>
                            </div>
                        )}

                        {problemStatement && (
                            <div className="p-6 bg-red-50/50 border border-red-100 rounded-3xl space-y-2 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-red-950 flex items-center gap-2.5">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                    Problem Statement
                                </h3>
                                <p className="text-red-900/80 leading-relaxed font-medium">{problemStatement}</p>
                            </div>
                        )}

                        {proposedSolution && (
                            <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-3xl space-y-2 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2.5">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    Proposed Solution
                                </h3>
                                <p className="text-emerald-900/80 leading-relaxed font-medium">{proposedSolution}</p>
                            </div>
                        )}
                    </div>
                )}

                <CommentsSection ideaId={_id} />

                <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-200">
                    {featuredItems.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200 text-slate-900 font-bold hover:bg-white hover:shadow-lg transition-all duration-300"
                        >
                            <item.icon className="w-5 h-5 text-blue-600" />
                            <span className='text-slate-900'>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const NotFound = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
            <h2 className="text-2xl font-bold text-red-500">Idea not found</h2>
            <p className="text-muted-foreground mt-2">Please log in to view protected details.</p>
        </div>
    );
}