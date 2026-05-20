"use client";

import { UpdateUserModal } from "@/components/UpdateUserModal";
import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";

const ProfilePage = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] px-4 py-16 text-left transition-colors duration-300">
      
      {/* Profile Card Container Layout wrapper */}
      <Card className="max-w-md mx-auto flex flex-col items-center bg-white dark:bg-[#0f1319] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/80 shadow-2xl text-center transition-colors">
        
        {/* User Image / Fallback Identity Block */}
        <div className="relative mb-5">
          <Avatar className="h-24 w-24 border-2 border-slate-100 dark:border-slate-800 shadow-md">
            <Avatar.Image
              alt={user?.name || "User Avatar"}
              src={user?.image}
              referrerPolicy="no-referrer"
            />
            <Avatar.Fallback className="text-2xl font-black bg-slate-100 dark:bg-purple-950/40 text-slate-800 dark:text-purple-300">
              {user?.name?.charAt(0) || "U"}
            </Avatar.Fallback>
          </Avatar>
        </div>

        {/* User Information Typography */}
        <h2 className="text-2xl font-black text-slate-900 dark:text-white transition-colors">
          {user?.name || "Anonymous Innovator"}
        </h2>
        
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1 mb-6 transition-colors">
          {user?.email || "No email available"}
        </p>

        {/* Action Button trigger modal layer */}
        <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-center">
          <UpdateUserModal />
        </div>

      </Card>
    </div>
  );
};

export default ProfilePage;