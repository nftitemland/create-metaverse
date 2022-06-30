const printStep = (n, letter) => {
  let coolGuy = "\n\n~~~~~(っ^‿^)っ";
  let otherSide = " ~~~~~";
  let stepName = String(n);

  if (letter) {
    coolGuy = "\n===(>*-*)>";
    otherSide = ":";
    stepName += `-${letter}`;
  }

  console.log(`${coolGuy}Step ${stepName}${otherSide}`);
};

module.exports = printStep;
