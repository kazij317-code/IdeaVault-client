"use client";

import { Button } from "@heroui/react";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32 bg-gradient-to-b from-blue-50 via-slate-50 to-slate-50 dark:from-[#0b0f19] dark:via-[#0e1422] dark:to-[#0b0f19] transition-colors duration-300 w-full">
            
            {/* Ambient Lighting Gradients — Hidden in light mode, gorgeous frosted depth in dark mode */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none hidden dark:block" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none hidden dark:block" />

            {/* Global Theme Overrides for Swiper Custom CSS Interface bullets/arrows */}
            {/* <style jsx global>{`
                .swiper-button-next, .swiper-button-prev {
                    color: #4f46e5 !important;
                    transform: scale(0.7);
                    transition: color 0.3s;
                }
                .dark .swiper-button-next, .dark .swiper-button-prev {
                    color: #a78bfa !important;
                }
                .swiper-pagination-bullet-active {
                    background: #4f46e5 !important;
                    width: 24px !important;
                    border-radius: 4px !important;
                    transition: all 0.3s;
                }
                .dark .swiper-pagination-bullet-active {
                    background: #a78bfa !important;
                }
                .swiper-pagination-bullet {
                    background: #94a3b8;
                }
            `}</style> */}

            <Swiper
                key="hero-carousel-loop"
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {/* Slide 1 - AI Innovations */}
                <SwiperSlide className="pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 dark:bg-blue-500/10 rounded-full border border-blue-600/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold text-sm transition-colors">
                                    <Star className="w-4 h-4 fill-blue-600 dark:fill-blue-400" />
                                    <span>AI & Machine Learning Innovations</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] transition-colors">
                                    Discover Future{' '}
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                        AI-Powered
                                    </span>{' '}
                                    Innovations
                                </h1>
                                <p className="text-xl text-slate-500 dark:text-gray-400 leading-relaxed max-w-xl transition-colors">
                                    Explore revolutionary neural engines, legal parsers, and custom model applications built to transform corporate and consumer industries.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link href="/ideas?search=AI">
                                        <Button
                                            color="primary"
                                            size="lg"
                                            className="h-14 px-10 text-lg font-bold rounded-full shadow-xl shadow-blue-600/20 dark:shadow-blue-500/10 group cursor-pointer"
                                        >
                                            Explore AI Ideas <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Image Container — Glassmorphic Profile Switch */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-35 transition duration-1000 dark:block" />
                                <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-md p-2 rounded-[2.5rem] border border-slate-200 dark:border-gray-800/60 shadow-2xl overflow-hidden aspect-video lg:aspect-square transition-all duration-300">
                                    <Image
                                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600"
                                        alt="AI Innovations"
                                        fill
                                        className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 - Biotech & Digital Health */}
                <SwiperSlide className="pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/10 dark:bg-emerald-500/10 rounded-full border border-emerald-600/20 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-sm transition-colors">
                                    <Star className="w-4 h-4 fill-emerald-600 dark:fill-emerald-400" />
                                    <span>Biotech & Digital Health Solutions</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] transition-colors">
                                    Pioneering Next-Gen{' '}
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                                        Med-Tech
                                    </span>{' '}
                                    Startups
                                </h1>
                                <p className="text-xl text-slate-500 dark:text-gray-400 leading-relaxed max-w-xl transition-colors">
                                    Discover continuous cardiac wearables, secure therapy matching dashboards, and remote health diagnostics changing the horizon of medical accessibility.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link href="/ideas?search=Health">
                                        <Button
                                            color="success"
                                            size="lg"
                                            className="h-14 px-10 text-lg font-bold text-white rounded-full shadow-xl shadow-emerald-600/20 dark:shadow-emerald-500/10 group cursor-pointer"
                                        >
                                            Explore Health Ideas <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Image Container — Glassmorphic Profile Switch */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-35 transition duration-1000 dark:block" />
                                <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-md p-2 rounded-[2.5rem] border border-slate-200 dark:border-gray-800/60 shadow-2xl overflow-hidden aspect-video lg:aspect-square transition-all duration-300">
                                    <Image
                                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
                                        alt="Health Innovations"
                                        fill
                                        className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 - IoT & Smart Systems */}
                <SwiperSlide className="pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 dark:bg-blue-500/10 rounded-full border border-blue-600/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold text-sm transition-colors">
                                    <Star className="w-4 h-4 fill-blue-600 dark:fill-blue-400" />
                                    <span>Pioneer Smart IoT & Smart Tech Systems</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] transition-colors">
                                    Pioneer the Future of{' '}
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                        IoT & GreenTech
                                    </span>
                                </h1>
                                <p className="text-xl text-slate-500 dark:text-gray-400 leading-relaxed max-w-xl transition-colors">
                                    Explore smart solar grid monitoring networks, carbon footprint calculators, and intelligent remote telemetry nodes built for precision.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link href="/ideas?search=Tech">
                                        <Button
                                            color="primary"
                                            size="lg"
                                            className="h-14 px-10 text-lg font-bold rounded-full shadow-xl shadow-blue-600/20 dark:shadow-blue-500/10 group cursor-pointer"
                                        >
                                            Explore Tech Ideas <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Image Container — Glassmorphic Profile Switch */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-35 transition duration-1000 dark:block" />
                                <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-md p-2 rounded-[2.5rem] border border-slate-200 dark:border-gray-800/60 shadow-2xl overflow-hidden aspect-video lg:aspect-square transition-all duration-300">
                                    <Image
                                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
                                        alt="Tech Innovations"
                                        fill
                                        className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Hero;