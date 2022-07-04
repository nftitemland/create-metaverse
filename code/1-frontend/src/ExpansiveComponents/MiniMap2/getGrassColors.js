function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const getGrassColors = (n = 2) => {
  const grassColors = [];

  for (let c = 0; c < n; c++) {
    grassColors.push([]);

    for (let r = 0; r < n; r++) {
      grassColors[c].push(`rgb(24, ${getRandomIntInclusive(200, 256)}, 42)`);
    }
  }

  return grassColors;
};

export default getGrassColors;
