import getExpansiveElement from "../../getExpansiveElement";

const getTree = ({ squareWidth, w, h }) => {
  return getExpansiveElement({
    backgroundColor: "green",
    squareWidth,
    xSize: w,
    ySize: h,
  });
};

export default getTree;
