import { auth } from '@/lib/auth';
import { Chip } from '@heroui/react';
import { BookOpen, Clock, BarChart, Users, AlertTriangle, CheckCircle2, Tag } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import CommentsSection from '@/components/CommentsSection';

const fetchSingleIdea = async (id, token) => {
    if (!token) return null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        });
        if (!res.ok) return null;

        const data = await res.json();
        return data || {};
    } catch (err) {
        console.error("Fetch single idea error:", err);
        return null;
    }
}

export default async function IdeaDetails({ params }) {
    const { id } = await params;
    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    const idea = await fetchSingleIdea(id, token);

    if (!idea || idea.message === "Unauthorize" || !idea.title) {
        return <NotFound />;
    }

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

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-left transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Left Content Panel Segment */}
                <div className="lg:col-span-2 space-y-8 bg-white dark:bg-[#0f1319] p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800/80 shadow-sm">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Chip size="sm" variant="flat" className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-100 dark:border-blue-900/30">
                                {category || "General"}
                            </Chip>
                            {tags && tags.split(',').map((tag, i) => (
                                <Chip key={i} size="sm" variant="flat" startContent={<Tag className="w-3 h-3" />} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                                    {tag.trim()}
                                </Chip>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{title}</h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">{shortDescription}</p>
                    </div>

                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                        <Image
                            src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200'}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                            Idea Overview
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{description}</p>
                    </div>
                </div>

                {/* Right Analytics Sidebar Segment */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0f1319] p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60">
                            <div>
                                <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Estimated Value</p>
                                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">${price || "0"}</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-950/40 p-3 rounded-xl border border-green-100 dark:border-green-900/30 text-green-600 dark:text-green-400 font-bold text-sm">
                                Open Idea
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50/50 dark:bg-[#0b0f17]/40 border border-slate-100 dark:border-slate-800/40">
                                <Users className="w-5 h-5 text-slate-400" />
                                <div>
                                  <p className="text-xs text-slate-400 font-medium">Innovator / Author</p>
                                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{instructor}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50/50 dark:bg-[#0b0f17]/40 border border-slate-100 dark:border-slate-800/40">
                                <Clock className="w-5 h-5 text-slate-400" />
                                <div>
                                  <p className="text-xs text-slate-400 font-medium">Status Duration</p>
                                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Active Campaign</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50/50 dark:bg-[#0b0f17]/40 border border-slate-100 dark:border-slate-800/40">
                                <BarChart className="w-5 h-5 text-slate-400" />
                                <div>
                                  <p className="text-xs text-slate-400 font-medium">Engaged Members</p>
                                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{enrollCount || 0} Backers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Structural Context Problem Statements */}
                    {(problemStatement || proposedSolution) && (
                        <div className="bg-white dark:bg-[#0f1319] p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
                            {problemStatement && (
                                <div className="p-4 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-3xl space-y-2 hover:shadow-md transition-all">
                                    <h3 className="text-lg font-bold text-amber-950 dark:text-amber-400 flex items-center gap-2.5">
                                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                                        Problem Statement
                                    </h3>
                                    <p className="text-amber-900/80 dark:text-amber-300/80 leading-relaxed font-medium">{problemStatement}</p>
                                </div>
                            )}

                            {proposedSolution && (
                                <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl space-y-2 hover:shadow-md transition-all">
                                    <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2.5">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                                        Proposed Solution
                                    </h3>
                                    <p className="text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed font-medium">{proposedSolution}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Operational Comments Section Segment */}
                    <div className="pt-4">
                        <CommentsSection ideaId={_id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] flex items-center justify-center transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <h2 className="text-2xl font-bold text-red-500">Idea not found</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Please make sure you are logged in or verify that this idea exists.</p>
            </div>
        </div>
    );
}