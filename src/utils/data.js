export const initialData = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    title: `Task ${i + 1}`,
    content: `This is hidden content for card ${i + 1}`,
}));
