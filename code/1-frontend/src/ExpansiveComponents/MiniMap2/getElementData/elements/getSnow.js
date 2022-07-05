import getExpansiveElement from "../../getExpansiveElement";

const getSnow = ({ squareWidth, w, h }) => {
  return getExpansiveElement({
    backgroundColor: "#FFFFFF",
    squareWidth,
    xSize: w,
    ySize: h,
  });
};

export default getSnow;
