export function getTopicsName(exp) {
  if (!exp || exp.length === 0) return [];
  const TopicNames = exp.map((e) => ({ name: e.name, size: e.lessons.length }));
  const data = [];
  TopicNames.forEach((e) => {
    data.push({
      name: e.name,
      value: e.size,
    });
  });
  return data;
}
