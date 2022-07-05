// import { getExpansiveElement } from "../../mapTools";

// import getExpansiveElement from "../../getExpansiveElement";

import { constants } from "../../mapTools";

const BuildingSite = ({
  squareWidth,
  currentlySelected,
  setCurrentlySelected,
  id,
}) => {
  let backgroundColor;

  const buildingIsSelected =
    currentlySelected?.type === constants.buildingTypes.TOWN_HALL &&
    currentlySelected.id === id;

  if (buildingIsSelected) {
    backgroundColor = "yellow";
  } else {
    backgroundColor = "blue";
  }

  return (
    <div
      style={{
        backgroundColor,
        width: squareWidth,
        height: squareWidth,
      }}
      onClick={() => {
        if (buildingIsSelected) {
          setCurrentlySelected(null);
        } else {
          setCurrentlySelected({
            type: constants.buildingTypes.TOWN_HALL,
            id,
          });
        }
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor,
          left: 0,
          width: 2 * squareWidth,
          height: 2 * squareWidth,
        }}
      ></div>

      {/* <div
        style={{
          position: "relative",
          backgroundColor: "pink",
          top: -2 * squareWidth,
          left: 1 * squareWidth,
          width: 4 * squareWidth,
          height: 4 * squareWidth,
        }}
      ></div> */}
    </div>
  );
};

export default BuildingSite;
