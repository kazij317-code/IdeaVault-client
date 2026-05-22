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
  List,
  AlertTriangle,
  CheckCircle2,
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
      toast.error('Please log in to submit your idea.');
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0f17] transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-purple-500"></div>
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
        toast.error('Please select a category');
        setLoading(false);
        return;
      }

      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;

      if (!token) {
        toast.error('Authentication failed');
        setLoading(false);
        return;
      }

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
        duration: 'Active Idea',
        instructor: session.user.name,
        instructorEmail: session.user.email,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ideaData),
        }
      );

      if (res.ok) {
        toast.success('Idea published successfully!');
        router.push('/');
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to publish idea');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] px-4 py-16 text-left transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#0f1319] p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/80 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-purple-950/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-purple-400 mb-4 transition-colors">
            <BookPlus className="w-8 h-8" />
          </div>

          <h1 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">
            Submit New Idea
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2 transition-colors">
            Share your innovative idea with the community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Title */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Idea Title
              </label>
              <Input
                id="title"
                name="title"
                required
                placeholder="AI-Powered Healthcare Platform"
                className="w-full"
                classNames={{
                  inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                  input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
                }}
              />
            </div>

            {/* Short Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Short Description
              </label>
              <Input
                id="shortDescription"
                name="shortDescription"
                required
                placeholder="A short one line summary"
                className="w-full"
                classNames={{
                  inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                  input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
                }}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Description
              </label>
              <TextArea
                id="description"
                name="description"
                required
                placeholder="Describe your idea..."
                className="w-full"
                classNames={{
                  inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                  input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
                }}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Category
              </label>
              <Select
                selectedKeys={selectedCategory}
                onSelectionChange={setSelectedCategory}
                placeholder="Select category"
                classNames={{
                  trigger: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border border-slate-200 dark:border-slate-800 data-[hover=true]:border-slate-300 dark:data-[hover=true]:border-slate-700 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                  value: "text-slate-800 dark:text-white font-medium",
                }}
              >
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <SelectValue placeholder="Select category" />
                  </div>
                  <SelectIndicator className="text-slate-400" />
                </SelectTrigger>

                <SelectPopover className="bg-white dark:bg-[#0f1319] border border-slate-200 dark:border-slate-800 rounded-xl">
                  <ListBox className="text-slate-800 dark:text-slate-200">
                    {CATEGORIES.map((cat) => (
                      <ListBoxItem
                        key={cat}
                        textValue={cat}
                        className="data-[hover=true]:bg-slate-100 dark:data-[hover=true]:bg-[#0b0f17]/60 rounded-lg transition-colors"
                      >
                        {cat}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </SelectPopover>
              </Select>
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Thumbnail URL
              </label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="url"
                required
                placeholder="https://example.com/image.jpg"
                className="w-full"
                classNames={{
                  inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                  input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
                }}
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Estimated Budget ($)
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="5000"
                className="w-full"
                classNames={{
                  inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                  input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
                }}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Tags
              </label>
              <Input
                id="tags"
                name="tags"
                placeholder="AI, SaaS, Web"
                className="w-full"
                classNames={{
                  inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                  input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
                }}
              />
            </div>

            {/* Audience */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Target Audience
              </label>
              <Input
                id="targetAudience"
                name="targetAudience"
                required
                placeholder="Students, developers, hospitals..."
                className="w-full"
                classNames={{
                  inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500",
                  input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
                }}
              />
            </div>

            {/* Problem */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Problem Statement
              </label>
              <div className="relative">
                <AlertTriangle className="absolute top-4 left-4 w-5 h-5 text-slate-400 dark:text-slate-500 z-10" />
                <TextArea
                  id="problemStatement"
                  name="problemStatement"
                  required
                  placeholder="What problem does this idea solve?"
                  className="w-full"
                  classNames={{
                    inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500 pl-12",
                    input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
                  }}
                />
              </div>
            </div>

            {/* Solution */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Proposed Solution
              </label>
              <div className="relative">
                <CheckCircle2 className="absolute top-4 left-4 w-5 h-5 text-slate-400 dark:text-slate-500 z-10" />
                <TextArea
                  id="proposedSolution"
                  name="proposedSolution"
                  required
                  placeholder="Describe your solution..."
                  className="w-full"
                  classNames={{
                    inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border-slate-200 dark:border-slate-800 focus-within:!border-blue-600 dark:focus-within:!border-purple-500 pl-12",
                    input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
                  }}
                />
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="flat"
              className="flex-1 font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:opacity-90 transition-opacity cursor-pointer"
              onPress={() => router.push('/')}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isLoading={loading}
              className="flex-1 font-bold rounded-xl text-white bg-gradient-to-r from-[#1d63ed] via-[#653df5] to-[#a426e7] hover:opacity-95 shadow-lg shadow-purple-500/10 transition-all active:scale-[0.99] cursor-pointer"
            >
              Publish Idea
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}