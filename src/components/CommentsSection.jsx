"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { MessageSquare, User } from "lucide-react";
import toast from "react-hot-toast";

export default function CommentsSection({ ideaId, ideaTitle }) {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");

    // Ensure localStorage is only accessed on the client side
    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem(`comments_${ideaId}`);
        if (stored) {
            try {
                setComments(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse comments", e);
            }
        }
    }, [ideaId]);

    const handlePostComment = (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            toast.error("Comment cannot be empty!");
            return;
        }

        const commentObject = {
            id: Date.now().toString(),
            ideaId,
            ideaTitle: ideaTitle,
            userName: session?.user?.name || "Guest User",
            userEmail: session?.user?.email || "guest@example.com",
            userImage: session?.user?.image || null,
            content: newComment.trim(),
            createdAt: new Date().toISOString(),
        };

        const updatedComments = [commentObject, ...comments];
        setComments(updatedComments);
        localStorage.setItem(`comments_${ideaId}`, JSON.stringify(updatedComments));
        setNewComment("");
        toast.success("Comment posted successfully!");
    };

    const handleDeleteComment = (commentId) => {
        const updatedComments = comments.filter((c) => c.id !== commentId);
        setComments(updatedComments);
        localStorage.setItem(`comments_${ideaId}`, JSON.stringify(updatedComments));
        toast.success("Comment deleted successfully!");
    };

    const handleStartEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditCommentText(comment.content);
    };

    const handleSaveEdit = (commentId) => {
        if (!editCommentText.trim()) {
            toast.error("Comment cannot be empty!");
            return;
        }

        const updatedComments = comments.map((c) => {
            if (c.id === commentId) {
                return { ...c, content: editCommentText.trim() };
            }
            return c;
        });

        setComments(updatedComments);
        localStorage.setItem(`comments_${ideaId}`, JSON.stringify(updatedComments));
        setEditingCommentId(null);
        setEditCommentText("");
        toast.success("Comment updated successfully!");
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditCommentText("");
    };

    const formatCommentDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-[#0f1319] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6 mt-8 text-left transition-colors duration-300">
            
            {/* Header section with Dynamic Indicator */}
            <div className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-[#2b56f5] dark:text-purple-400 transition-colors" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">
                    Comments ({comments.length})
                </h3>
            </div>

            {/* Comment Entry Area */}
            <form onSubmit={handlePostComment} className="space-y-4 flex flex-col items-start">
                <textarea
                    placeholder="Add your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full min-h-[100px] text-base p-4 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 focus:border-[#2b56f5] dark:focus:border-purple-500 focus:ring-1 focus:ring-[#2b56f5] dark:focus:ring-purple-500 rounded-2xl bg-slate-50/50 dark:bg-[#0b0f17]/50 outline-none text-slate-800 dark:text-white font-medium placeholder-slate-400 dark:placeholder-slate-500 transition-all resize-none shadow-inner"
                />

                <button
                    type="submit"
                    className="bg-gradient-to-r from-[#2b56f5] via-[#633df4] to-[#a624e5] hover:opacity-95 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-purple-600/10 transition-all active:scale-[0.98] h-11 cursor-pointer text-sm"
                >
                    Post Comment
                </button>
            </form>

            {/* Comments List Grid Container */}
            {comments.length > 0 && (
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 space-y-6 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                    {comments.map((comment) => {
                        const initials = comment.userName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase();

                        const isEditing = editingCommentId === comment.id;

                        return (
                            <div
                                key={comment.id}
                                className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-[#0b0f17]/40 border border-slate-100 dark:border-slate-800/60 hover:shadow-md dark:hover:shadow-purple-500/5 transition-all duration-300 group"
                            >
                                {/* User Picture Frame */}
                                <div className="flex-shrink-0">
                                    {comment.userImage ? (
                                        <img
                                            src={comment.userImage}
                                            alt={comment.userName}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shadow-sm"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 dark:bg-purple-950/40 dark:text-purple-300 flex items-center justify-center font-bold text-sm border border-blue-200 dark:border-purple-800/30 shadow-inner group-hover:bg-blue-200 dark:group-hover:bg-purple-950/60 transition-colors">
                                            {initials || <User className="w-4 h-4" />}
                                        </div>
                                    )}
                                </div>

                                {/* Content block layout */}
                                <div className="space-y-1 flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-4">
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base leading-tight truncate">
                                            {comment.userName}
                                        </h4>
                                        
                                        {/* Action Buttons Layer */}
                                        <div className="flex items-center shrink-0">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSaveEdit(comment.id)}
                                                        className="text-[#2b56f5] dark:text-blue-400 hover:opacity-80 font-bold text-sm transition-colors cursor-pointer mr-3"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleCancelEdit}
                                                        className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 font-bold text-sm transition-colors cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleStartEdit(comment)}
                                                        className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-bold text-sm transition-colors cursor-pointer mr-3"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        className="text-red-400 dark:text-red-500/80 hover:text-red-600 dark:hover:text-red-400 font-bold text-sm transition-colors cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Display content view versus update input view */}
                                    {isEditing ? (
                                        <textarea
                                            value={editCommentText}
                                            onChange={(e) => setEditCommentText(e.target.value)}
                                            className="w-full min-h-[60px] text-sm p-3 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-[#2b56f5] dark:focus:border-purple-500 focus:ring-1 focus:ring-[#2b56f5] dark:focus:ring-purple-500 rounded-xl bg-white dark:bg-[#0f1319] outline-none text-slate-800 dark:text-white font-medium placeholder-slate-400 dark:placeholder-slate-500 transition-all resize-none mt-1.5 shadow-inner"
                                        />
                                    ) : (
                                        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed break-words whitespace-pre-wrap pt-0.5">
                                            {comment.content}
                                        </p>
                                    )}
                                    
                                    <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold block pt-1">
                                        {formatCommentDate(comment.createdAt)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}