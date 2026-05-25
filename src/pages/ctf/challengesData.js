export const challengesData = Array.from({ length: 150 }, (_, i) => {
  const id = i + 1;

  let category;

  if (id <= 25) category = "OSINT";
  else if (id <= 50) category = "Web Exploitation";
  else if (id <= 75) category = "Cryptography";
  else if (id <= 100) category = "Forensics";
  else if (id <= 125) category = "Networking";
  else category = "Reverse Engineering";

  const difficulty =
    id <= 50 ? "Easy" : id <= 100 ? "Medium" : "Hard";

  return {
    id,
    title: `Challenge ${id}`,
    category,
    difficulty,
    points: id * 5,
    unlockScore: (id - 1) * 5,
    flag: `CPCTF{flag_${id}}`,
    description: `Solve Challenge ${id} in ${category}.`,
  };
});