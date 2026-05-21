import MyIdeaCard from "@/components/MyIdeaCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function fetchMyIdeas(token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-ideas`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function MyIdeasPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const ideas = await fetchMyIdeas(token);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Ideas</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas?.map((idea) => (
          <MyIdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </div>
  );
}