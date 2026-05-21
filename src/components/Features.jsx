import React from "react";
import { Award, Play, Users } from "lucide-react";

const Features = () => {
  const featureItems = [
    {
      icon: Users,
      title: "Expert Innovators",
      desc: "Collaborate with industry leaders with real-world startup expertise.",
      accent: "group-hover:border-purple-500/40 dark:group-hover:border-purple-500/50 group-hover:shadow-[0_10px_30px_-10px_rgba(147,51,234,0.15)] dark:group-hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]",
      iconBg: "bg-purple-600/10 text-purple-600 dark:bg-purple-600/20 dark:text-purple-400 group-hover:bg-purple-600 dark:group-hover:bg-purple-500",
    },
    {
      icon: Award,
      title: "Verified Traction",
      desc: "Gather verified feedback and interest from top industry advisors.",
      accent: "group-hover:border-blue-500/40 dark:group-hover:border-blue-500/50 group-hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15)] dark:group-hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]",
      iconBg: "bg-blue-600/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500",
    },
    {
      icon: Play,
      title: "Lifetime Collaboration",
      desc: "Build at your own pace with unlimited lifetime interaction on your ideas.",
      accent: "group-hover:border-indigo-500/40 dark:group-hover:border-indigo-500/50 group-hover:shadow-[0_10px_30px_-10px_rgba(79,70,229,0.15)] dark:group-hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]",
      iconBg: "bg-indigo-600/10 text-indigo-600 dark:bg-indigo-600/20 dark:text-indigo-400 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500",
    },
  ];

  return (
    <section className="bg-slate-50 dark:bg-[#0b0f19] py-24 px-4 sm:px-6 lg:px-8 w-full text-center relative overflow-hidden transition-colors duration-300">
      {/* Decorative background ambient light burst - Active only in Dark mode */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none hidden dark:block" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Text Block */}
        <div className="space-y-3 mb-16">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 font-bold uppercase tracking-widest text-xs">
            Our Benefits
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            Why Choose IdeaVault?
          </h3>
        </div>

        {/* Features Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {featureItems.map((f, i) => (
            <div
              key={i}
              className={`group relative p-8 bg-white dark:bg-gray-900/40 backdrop-blur-md border border-slate-200 dark:border-gray-800/60 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 text-center space-y-6 ${f.accent}`}
            >
              {/* Micro-glow internal sheen overlay for hover states */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-500/[0.01] to-transparent dark:from-white/[0.02] dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />

              {/* Icon Capsule */}
              <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center group-hover:text-white dark:group-hover:text-white shadow-sm dark:shadow-inner transition-all duration-300 ${f.iconBg}`}>
                <f.icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Text Layout Content */}
              <div className="space-y-3 relative z-10">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                  {f.title}
                </h4>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;