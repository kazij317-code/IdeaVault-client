export const fetchIdeas = async (searchTerm = '', category = '') => {
  
  // Api Calling for all ideas data
  let url = `${process.env.NEXT_PUBLIC_API_URL}/ideas?`;
  const params = new URLSearchParams();
  if (searchTerm) params.set('search', searchTerm);
  if (category && category !== 'All') params.set('category', category);

  const res = await fetch(url + params.toString());
  const data = await res.json();
  return data || [];
};

// Api calling for Featured ideas data
export const fetchFeaturedIdeas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);
  const data = await res.json();
  return data || [];
};

