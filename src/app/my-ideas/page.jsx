import MyIdeaCard from "@/components/MyIdeaCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function fetchMyIdeas(token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-ideas`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
}

export default async function MyIdeasPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const ideas = await fetchMyIdeas(token) || [];
  const hasIdeas = Array.isArray(ideas) && ideas.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] py-16 px-4 sm:px-6 lg:px-8 text-left transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white transition-colors">
            My Ideas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium transition-colors">
            Manage and monitor your submitted innovations and active pitches.
          </p>
        </div>

        {/* Ideas Grid Layout Container */}
        {hasIdeas ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideas.map((idea) => (
              <MyIdeaCard
                key={idea._id}
                idea={idea}
              />
            ))}
          </div>
        ) : (
          /* Empty Placeholder State */
          <div className="flex flex-col items-center justify-center p-16 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1319] text-center shadow-xl transition-colors">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 transition-colors">
              No ideas published yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-sm transition-colors">
              Your dashboard is looking a bit quiet! Share your first breakthrough concept with the global community.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}