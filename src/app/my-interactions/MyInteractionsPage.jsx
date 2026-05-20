"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function MyInteractionsPage() {
  const { data: session } = useSession();
  const [myComments, setMyComments] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    const userEmail = session.user.email;
    let allComments = [];

    // loop through all localStorage keys
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("comments_")) {
        const ideaId = key.replace("comments_", "");

        try {
          const comments = JSON.parse(localStorage.getItem(key)) || [];

          const filtered = comments
            .filter((comment) => comment.userEmail === userEmail)
            .map((comment) => ({
              ...comment,
              ideaId,
            }));

          allComments.push(...filtered);
        } catch (error) {
          console.error(error);
        }
      }
    });

    // newest first
    allComments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setMyComments(allComments);
  }, [session]);

  // Format ISO string to readable localized date (e.g., "May 16, 2026")
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] px-6 py-16 text-left transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Title Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">
            My Interactions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium transition-colors">
            View ideas you've liked and comments you've made across the community platform.
          </p>
        </div>

        {/* Section Comment Header Count */}
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800/80 pb-3 mb-6 transition-colors">
          Comments ({myComments.length})
        </h2>

        {/* Dynamic Activity List Render */}
        {myComments.length > 0 ? (
          <div className="space-y-4">
            {myComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white dark:bg-[#0f1319] shadow-xl hover:shadow-2xl dark:hover:shadow-purple-500/[0.02] rounded-2xl p-6 border border-slate-200 dark:border-slate-800/80 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white transition-colors line-clamp-1">
                    {comment.ideaTitle || "Idea Workspace"}
                  </h3>
                  
                  {/* Action Link Anchor to Parent Post */}
                  <Link 
                    href={`/ideas/${comment.ideaId}`}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-purple-400 hover:opacity-80 shrink-0 transition-opacity"
                  >
                    View Idea <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm font-medium leading-relaxed break-words whitespace-pre-wrap transition-colors">
                  {comment.content}
                </p>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/40 text-xs text-slate-400 dark:text-slate-500 font-semibold transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Posted on {formatDate(comment.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Placeholder Grid State */
          <div className="flex flex-col items-center justify-center p-16 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1319] text-center shadow-xl transition-all">
            <div className="w-12 h-12 bg-slate-100 dark:bg-purple-950/30 rounded-xl flex items-center justify-center text-slate-400 dark:text-purple-400 mb-4 transition-colors">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 transition-colors">
              No conversations started
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-sm transition-colors">
              You haven't posted any feedback comments yet. Engage on a startup pitch to track history indicators.
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
}