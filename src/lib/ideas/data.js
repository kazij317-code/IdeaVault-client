export const fetchIdeas = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`)
    const data = await res.json();
    
}


export const fetchFeaturedIdeas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);
  const data = await res.json();
  
};
