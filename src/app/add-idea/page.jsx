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
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
            <BookPlus className="w-8 h-8" />
          </div>

          <h1 className="text-4xl font-black text-slate-900">
            Submit New Idea
          </h1>

          <p className="text-slate-500 mt-2">
            Share your innovative idea with the community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Title */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Idea Title
              </label>

              <Input
                id="title"
                name="title"
                required
                placeholder="AI-Powered Healthcare Platform"
                className="w-full"
              />
            </div>

            {/* Short Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Short Description
              </label>

              <Input
                id="shortDescription"
                name="shortDescription"
                required
                placeholder="A short one line summary"
                className="w-full"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Description
              </label>

              <TextArea
                id="description"
                name="description"
                required
                placeholder="Describe your idea..."
                className="w-full"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Category
              </label>

              <Select
                selectedKeys={selectedCategory}
                onSelectionChange={setSelectedCategory}
                placeholder="Select category"
              >
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-slate-500" />
                    <SelectValue placeholder="Select category" />
                  </div>

                  <SelectIndicator />
                </SelectTrigger>

                <SelectPopover>
                  <ListBox>
                    {CATEGORIES.map((cat) => (
                      <ListBoxItem key={cat} id={cat}>
                        {cat}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </SelectPopover>
              </Select>
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Thumbnail URL
              </label>

              <Input
                id="thumbnail"
                name="thumbnail"
                type="url"
                required
                placeholder="https://example.com/image.jpg"
                className="w-full"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Estimated Budget
              </label>

              <Input
                id="price"
                name="price"
                type="number"
                placeholder="5000"
                className="w-full"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Tags
              </label>

              <Input
                id="tags"
                name="tags"
                placeholder="AI, SaaS, Web"
                className="w-full"
              />
            </div>

            {/* Audience */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Target Audience
              </label>

              <Input
                id="targetAudience"
                name="targetAudience"
                required
                placeholder="Students, developers, hospitals..."
                className="w-full"
              />
            </div>

            {/* Problem */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Problem Statement
              </label>

              <div className="relative">
                <AlertTriangle className="absolute top-4 left-4 w-5 h-5 text-slate-400 z-10" />

                <TextArea
                  id="problemStatement"
                  name="problemStatement"
                  required
                  placeholder="What problem does this idea solve?"
                  className="w-full pl-12"
                />
              </div>
            </div>

            {/* Solution */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Proposed Solution
              </label>

              <div className="relative">
                <CheckCircle2 className="absolute top-4 left-4 w-5 h-5 text-slate-400 z-10" />

                <TextArea
                  id="proposedSolution"
                  name="proposedSolution"
                  required
                  placeholder="Describe your solution..."
                  className="w-full pl-12"
                />
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">

            <Button
              type="button"
              variant="flat"
              className="flex-1"
              onPress={() => router.push('/')}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              type="submit"
              isLoading={loading}
              className="flex-1"
            >
              Publish Idea
            </Button>

          </div>
        </form>
      </div>
    </div>
  );
}