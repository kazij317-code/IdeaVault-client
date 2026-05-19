export const fetchIdeas = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL/ideas}`)
    const data = res.json();
    return data || [];
}
