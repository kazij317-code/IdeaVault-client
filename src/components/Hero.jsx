"use client";
import { Button } from "@heroui/react";
import { ArrowRight, Star, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Hero = () => {

    return (
        <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32 from-blue-50 via-slate-50 to-slate-50">

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
                <SwiperSlide>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full border border-blue-600/20 text-blue-600 font-bold text-sm">
                                    <Star className="w-4 h-4 fill-blue-600" />
                                    <span>AI & Machine Learning Innovations</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                    Discover Future{' '}
                                    <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">
                                        AI-Powered
                                    </span>{' '}
                                    Innovations
                                </h1>
                                <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                                    Explore revolutionary neural engines, legal parsers, and custom model applications built to transform corporate and consumer industries.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link href="/ideas?search=AI">
                                        <Button
                                            color="primary"
                                            size="lg"
                                            className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl shadow-blue-600/30 group"
                                        >
                                            Explore AI Ideas <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                                    <Image
                                        src="https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop"
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
                <SwiperSlide>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/10 rounded-full border border-emerald-600/20 text-emerald-600 font-bold text-sm">
                                    <Star className="w-4 h-4 fill-emerald-600" />
                                    <span>Biotech & Digital Health Solutions</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                    Pioneering Next-Gen{' '}
                                    <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-800">
                                        Med-Tech
                                    </span>{' '}
                                    Startups
                                </h1>
                                <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                                    Discover continuous cardiac wearables, secure therapy matching dashboards, and remote health diagnostics changing the horizon of medical accessibility.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link href="/ideas?search=Health">
                                        <Button
                                            color="success"
                                            size="lg"
                                            className="h-14 px-10 text-lg font-bold text-white rounded-full shadow-2xl shadow-emerald-600/30 group"
                                        >
                                            Explore Health Ideas <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-teal-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
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
                <SwiperSlide>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full border border-blue-600/20 text-blue-600 font-bold text-sm">
                                    <Star className="w-4 h-4 fill-blue-600" />
                                    <span>Pioneer Smart IoT & Smart Tech Systems</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                    Pioneer the Future of{' '}
                                    <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">
                                        IoT & GreenTech
                                    </span>
                                </h1>
                                <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                                    Explore smart solar grid monitoring networks, carbon footprint calculators, and intelligent remote telemetry nodes built for precision.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link href="/ideas?search=Tech">
                                        <Button
                                            color="primary"
                                            size="lg"
                                            className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl shadow-blue-600/30 group"
                                        >
                                            Explore Tech Ideas <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
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