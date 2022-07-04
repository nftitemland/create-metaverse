const getGrassColors = (n = 2) => {
  const grassColors = [];

  for (let c = 0; c < n; c++) {
    grassColors.push([]);

    for (let r = 0; r < n; r++) {
      grassColors[c].push(`rgb(24, ${Math.random() * 256 + 125}, 42)`);
    }
  }

  return grassColors;
};

export default getGrassColors;
