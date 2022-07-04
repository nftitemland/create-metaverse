const getRoundedNumber = (num, decimal = 8) => {
  const multiplier = Math.pow(10, decimal);

  const roundedNumber =
    Math.round((num + Number.EPSILON) * multiplier) / multiplier;

  return roundedNumber;
};

export default getRoundedNumber;
