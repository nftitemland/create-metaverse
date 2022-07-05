const getGroundColors = (n = 2, color) => {
  const groundColors = [];

  for (let c = 0; c < n; c++) {
    groundColors.push([]);

    for (let r = 0; r < n; r++) {
      groundColors[c].push(color);
    }
  }

  return groundColors;
};

export default getGroundColors;
