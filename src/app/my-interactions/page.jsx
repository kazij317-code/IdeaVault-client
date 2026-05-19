"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

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

  // const formatDate = (date) =>
  //   new Date(date).toLocaleDateString("en-US");

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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">My Interactions</h1>
      <p className="text-gray-500 mb-8">
        View ideas you've liked and comments you've made.
      </p>

      <h2 className="text-xl font-semibold border-b pb-3 mb-6">
        Comments ({myComments.length})
      </h2>

      <div className="space-y-4">
        {myComments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white shadow rounded-xl p-6 border"
          >
            <h3 className="font-bold text-lg">
              {/* Idea ID: {comment.ideaId} */}
              {comment.ideaTitle}

            </h3>

            <p className="text-gray-700 mt-2">
              {comment.content}
            </p>

            <p className="text-sm text-gray-400 mt-3">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}