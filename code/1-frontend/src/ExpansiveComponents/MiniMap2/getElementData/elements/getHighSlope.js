import getExpansiveElement from "../../getExpansiveElement";

const getHighSlope = ({ squareWidth, w, h }) => {
  return getExpansiveElement({
    backgroundColor: "#024901",
    squareWidth,
    xSize: w,
    ySize: h,
  });
};

export default getHighSlope;
