export function getTopicsName(exp) {
  if (!exp || exp.length === 0) return [];
  const TopicNames = exp.map((e) => e.topics.split("-")).flat();
  let set = new Set(TopicNames);

  const data = [];
  set.forEach((e) => {
    data.push({
      name: e,
      value: TopicNames.filter((x) => x === e).length,
    });
  });
  return data;
}
