'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

import {
    Button,
    Input,
    TextArea,
    Select,
    SelectTrigger,
    SelectValue,
    SelectIndicator,
    SelectPopover,
    ListBox,
    ListBoxItem,
} from '@heroui/react';

import {
    BookPlus,
    Image as ImageIcon,
    DollarSign,
    Clock,
    List,
    Tag,
    Users,
    AlertTriangle,
    CheckCircle2
} from 'lucide-react';

const CATEGORIES = [
    'Tech',
    'Health',
    'AI',
    'Education',
];

export default function AddIdeaPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState(new Set());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isPending && !session) {
            toast.error("Please log in to submit your idea.");
            router.push('/login');
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const title = formData.get('title');
            const shortDescription = formData.get('shortDescription');
            const description = formData.get('description');
            const thumbnail = formData.get('thumbnail');
            const price = formData.get('price') || '';
            const tags = formData.get('tags') || '';
            const targetAudience = formData.get('targetAudience');
            const problemStatement = formData.get('problemStatement');
            const proposedSolution = formData.get('proposedSolution');
            const category = Array.from(selectedCategory)[0];

            if (!category) {
                toast.error("Please select a category");
                setLoading(false);
                return;
            }

            const { data: jwtData } = await authClient.token();
            const token = jwtData?.token;
            if (!token) {
                toast.error("Authentication failed. Please log in again.");
                setLoading(false);
                return;
            }

            const duration = "N/A";

            const ideaData = {
                title,
                shortDescription,
                description,
                thumbnail,
                category,
                price,
                tags,
                targetAudience,
                problemStatement,
                proposedSolution,
                duration,
                instructor: session.user.name,
                instructorEmail: session.user.email,
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(ideaData)
            });

            if (res.ok) {
                toast.success("Idea published successfully!");
                router.push('/');
                router.refresh();
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to publish idea");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while publishing your idea");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-10">
                <div className="space-y-2 text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                        <BookPlus className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900">
                        Submit New{' '}
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">Idea</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Share your innovative idea and connect with creators</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Idea Title */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="title" className="text-sm font-bold text-slate-700 ml-1">
                                Idea Title <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="title"
                                name="title"
                                required
                                placeholder="e.g. AI-Powered Healthcare Diagnostics Platform"
                                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl"
                            />
                        </div>

                        {/* Short Description */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="shortDescription" className="text-sm font-bold text-slate-700 ml-1">
                                Short Description <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="shortDescription"
                                name="shortDescription"
                                required
                                placeholder="A brief one-sentence hook for your idea"
                                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl"
                            />
                        </div>

                        {/* Detailed Description */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="description" className="text-sm font-bold text-slate-700 ml-1">
                                Detailed Description <span className="text-red-500">*</span>
                            </label>
                            <TextArea
                                id="description"
                                name="description"
                                required
                                placeholder="Elaborate on the details, features, and core mechanics of your idea..."
                                className="w-full border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl"
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <Select
                                id="category"
                                required
                                placeholder="Select a category"
                                selectedKeys={selectedCategory}
                                onSelectionChange={setSelectedCategory}
                            >
                                <SelectTrigger className="h-14 border-2 border-slate-200 rounded-2xl flex items-center px-4">
                                    <div className="flex items-center gap-3 w-full">
                                        <List className="w-5 h-5 text-slate-400" />
                                        <SelectValue placeholder="Select a category" />
                                    </div>
                                    <SelectIndicator />
                                </SelectTrigger>

                                <SelectPopover className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-2 mt-2 z-50">
                                    <ListBox>
                                        {CATEGORIES.map((cat) => (
                                            <ListBoxItem
                                                key={cat}
                                                id={cat}
                                                className="px-4 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors font-medium"
                                            >
                                                {cat}
                                            </ListBoxItem>
                                        ))}
                                    </ListBox>
                                </SelectPopover>
                            </Select>
                        </div>

                        {/* Image URL */}
                        <div className="space-y-2">
                            <label htmlFor="thumbnail" className="text-sm font-bold text-slate-700 ml-1">
                                Image URL <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="thumbnail"
                                name="thumbnail"
                                required
                                type="url"
                                placeholder="https://images.unsplash.com/..."
                                startContent={<ImageIcon className="w-5 h-5 text-slate-400" />}
                                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl"
                            />
                        </div>

                        {/* Estimated Budget (Optional) */}
                        <div className="space-y-2">
                            <label htmlFor="price" className="text-sm font-bold text-slate-700 ml-1">
                                Estimated Budget ($) <span className="text-xs text-slate-400 font-medium">(optional)</span>
                            </label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="e.g. 5000"
                                startContent={<DollarSign className="w-5 h-5 text-slate-400" />}
                                className="w-full h-14 border-2 border-slate-200 rounded-2xl"
                            />
                        </div>

                        {/* Tags (Optional) */}
                        <div className="space-y-2">
                            <label htmlFor="tags" className="text-sm font-bold text-slate-700 ml-1">
                                Tags <span className="text-xs text-slate-400 font-medium">(optional, comma-separated)</span>
                            </label>
                            <Input
                                id="tags"
                                name="tags"
                                placeholder="e.g. SaaS, Healthcare, AI, Web"
                                startContent={<Tag className="w-5 h-5 text-slate-400" />}
                                className="w-full h-14 border-2 border-slate-200 rounded-2xl"
                            />
                        </div>

                        {/* Target Audience */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="targetAudience" className="text-sm font-bold text-slate-700 ml-1">
                                Target Audience <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="targetAudience"
                                name="targetAudience"
                                required
                                placeholder="e.g. Elderly patients, Independent web developers, High-school teachers"
                                startContent={<Users className="w-5 h-5 text-slate-400" />}
                                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl"
                            />
                        </div>

                        {/* Problem Statement */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="problemStatement" className="text-sm font-bold text-slate-700 ml-1">
                                Problem Statement <span className="text-red-500">*</span>
                            </label>
                            {/* <TextArea
                                id="problemStatement"
                                name="problemStatement"
                                required
                                placeholder="What is the key pain point or problem this idea attempts to address?"
                                startContent={<AlertTriangle className="w-5 h-5 text-slate-400 mt-1" />}
                                className="w-full border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl"
                            /> */}
                            <div className="relative">
                                <AlertTriangle className="absolute top-4 left-4 w-5 h-5 text-slate-400 z-10" />

                                <TextArea
                                    id="problemStatement"
                                    name="problemStatement"
                                    required
                                    placeholder="What is the key pain point or problem this idea attempts to address?"
                                    className="w-full border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl pl-12"
                                />
                            </div>
                        </div>

                        {/* Proposed Solution */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="proposedSolution" className="text-sm font-bold text-slate-700 ml-1">
                                Proposed Solution <span className="text-red-500">*</span>
                            </label>
                            {/* <TextArea
                                id="proposedSolution"
                                name="proposedSolution"
                                required
                                placeholder="How does your idea solve the problem statement described above?"
                                startContent={<CheckCircle2 className="w-5 h-5 text-slate-400 mt-1" />}
                                className="w-full border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl"
                            /> */}
                            <div className="relative">
                                <CheckCircle2 className="absolute top-4 left-4 w-5 h-5 text-slate-400 z-10" />

                                <TextArea
                                    id="proposedSolution"
                                    name="proposedSolution"
                                    required
                                    placeholder="How does your idea solve the problem statement described above?"
                                    className="w-full border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl pl-12"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="pt-6 flex gap-4">
                        <Button
                            variant="flat"
                            size="lg"
                            className="flex-1 font-bold rounded-2xl h-14"
                            onPress={() => router.push('/')}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="primary"
                            type="submit"
                            size="lg"
                            isLoading={loading}
                            className="flex-1 font-black rounded-2xl h-14 shadow-xl shadow-blue-600/20"
                        >
                            Publish Idea
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
}
