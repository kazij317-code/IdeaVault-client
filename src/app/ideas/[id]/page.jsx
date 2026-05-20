import IdeaDetails from "./IdeaDetails.jsx";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  // Await params safely
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const res = await fetch(
      `http://localhost:5000/ideas/meta/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {
        title: "Idea Details",
      };
    }

    const idea = await res.json();

    return {
      title: idea.title,
      description: idea.shortDescription,
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Idea Details",
    };
  }
}

// Make the Page component async and await params before passing it down
export default async function Page({ params }) {
  const resolvedParams = await params;
  
  return <IdeaDetails params={resolvedParams} />;
}