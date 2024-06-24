export function getLevelsCount(exp) {
  if (!exp || exp.length === 0) return [];
  let numOfEasy = exp
    .map((e) => (e.level === "easy" ? 1 : 0))
    .reduce((a, b) => a + b);
  const numOfMedium = exp
    .map((e) => (e.level === "medium" ? 1 : 0))
    .reduce((a, b) => a + b);
  const numOfHard = exp
    .map((e) => (e.level === "hard" ? 1 : 0))
    .reduce((a, b) => a + b);

  return [
    { name: "Easy", value: numOfEasy, color: "#00C49F" },
    { name: "Medium", value: numOfMedium, color: "#FFBB28" },
    { name: "Hard", value: numOfHard, color: "#FF8042" },
  ];
}
