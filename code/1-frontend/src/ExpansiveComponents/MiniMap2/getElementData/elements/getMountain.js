import getExpansiveElement from "../../getExpansiveElement";

const getMountain = ({ squareWidth, w, h }) => {
  return getExpansiveElement({
    backgroundColor: "#444444",
    squareWidth,
    xSize: w,
    ySize: h,
  });
};

export default getMountain;
