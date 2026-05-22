import { auth } from '@/lib/auth';
import { Chip } from '@heroui/react';
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import CommentsSection from '@/components/CommentsSection';

const fetchSingleIdea = async (id, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`,
    {
      cache: "no-store",
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data || null;
};

export default async function IdeaDetails({ params }) {
  const { id } = params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const idea = await fetchSingleIdea(id, token);

  if (!idea || idea.message === "Unauthorize") {
    return <NotFound />;
  }

  const {
    _id,
    title,
    shortDescription,
    thumbnail,
    description,
    category,
    tags,
    targetAudience,
    problemStatement,
    proposedSolution,
  } = idea;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-left">

          <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video border border-transparent dark:border-slate-800/60">
            <Image
              src={
                thumbnail ||
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
              }
              alt={title}
              fill
              className="object-cover transform transition duration-700 group-hover:scale-105"
            />

            <div className="absolute top-6 left-6">
              <Chip
                variant="solid"
                className="font-bold bg-blue-600 text-white dark:bg-zinc-800/80 dark:text-white dark:backdrop-blur-md border-transparent shadow-xl"
              >
                {category}
              </Chip>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {title}
            </h1>

            {shortDescription && (
              <p className="text-xl font-bold text-[#2b56f5] dark:text-blue-400">
                {shortDescription}
              </p>
            )}

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.split(",").map((tag, idx) => (
                <Chip
                  key={idx}
                  variant="flat"
                  size="sm"
                  className="font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300"
                >
                  <div className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {tag.trim().startsWith("#")
                      ? tag.trim()
                      : `#${tag.trim()}`}
                  </div>
                </Chip>
              ))}
            </div>
          )}

          {(targetAudience || problemStatement || proposedSolution) && (
            <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800/60">

              {targetAudience && (
                <div className="p-6 bg-white dark:bg-[#0f1319] border rounded-3xl">
                  <h3 className="text-lg font-bold flex items-center gap-2.5">
                    <Users className="w-5 h-5 text-blue-600" />
                    Target Audience
                  </h3>
                  <p>{targetAudience}</p>
                </div>
              )}

              {problemStatement && (
                <div className="p-6 bg-red-50/50 dark:bg-red-950/10 border rounded-3xl">
                  <h3 className="text-lg font-bold text-red-500 flex items-center gap-2.5">
                    <AlertTriangle className="w-5 h-5" />
                    Problem Statement
                  </h3>
                  <p>{problemStatement}</p>
                </div>
              )}

              {proposedSolution && (
                <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/10 border rounded-3xl">
                  <h3 className="text-lg font-bold text-emerald-500 flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5" />
                    Proposed Solution
                  </h3>
                  <p>{proposedSolution}</p>
                </div>
              )}
            </div>
          )}

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Idea not found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Please log in to view protected details.
        </p>
      </div>
    </div>
  );
};