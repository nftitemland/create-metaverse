import defaultData from "./defaultData";
import getGrassColors from "./getGrassColors";

const squareWidth = 30;

const grassColors = getGrassColors(10);

const backgroundColorToReservedBackgroundColor = {
  black: "peru",
  darkblue: "teal",
  red: "red",
};

const getStandardElement = ({
  backgroundColor,
  reserved,
  text,
  textColor = "white",
}) => {
  return (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,
        backgroundColor: reserved
          ? backgroundColorToReservedBackgroundColor[backgroundColor]
          : backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {text && (
        <div
          style={{
            fontFamily: `"Amaranth", sans-serif`,

            fontSize: 16,
            color: textColor,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

const ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR = "darkblue";
const DIAMOND_LANDS_BACKGROUND_COLOR = "black";
const ROYAL_GUARD_LANDS_BACKGROUND_COLOR = "red";
const YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR = "yellow";

const getElementData = (landsData) => {
  const elementData = {
    "1-2": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 7,
        reserved: landsData[7],
      }),
    },
    "2-2": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 8,
        reserved: landsData[8],
      }),
    },
    "3-2": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 9,
        reserved: landsData[9],
      }),
    },
    "4-2": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 10,
        reserved: landsData[10],
      }),
    },
    "5-2": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 11,
        reserved: landsData[11],
      }),
    },
    "6-2": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 12,
        reserved: landsData[12],
      }),
    },
    "7-2": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 13,
        reserved: landsData[13],
      }),
    },
    "7-3": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 14,
        reserved: landsData[14],
      }),
    },
    "7-4": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 15,
        reserved: landsData[15],
      }),
    },
    "7-5": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 16,
        reserved: landsData[16],
      }),
    },
    "7-6": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 17,
        reserved: landsData[17],
      }),
    },
    "7-7": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 18,
        reserved: landsData[18],
      }),
    },
    "6-7": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 19,
        reserved: landsData[19],
      }),
    },
    "5-7": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 20,
        reserved: landsData[20],
      }),
    },
    "4-7": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 21,
        reserved: landsData[21],
      }),
    },
    "3-7": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 22,
        reserved: landsData[22],
      }),
    },
    "2-7": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 23,
        reserved: landsData[23],
      }),
    },
    "1-7": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 24,
        reserved: landsData[24],
      }),
    },
    "1-6": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 25,
        reserved: landsData[25],
      }),
    },
    "1-5": {
      element: getStandardElement({
        backgroundColor: DIAMOND_LANDS_BACKGROUND_COLOR,
        text: 26,
        reserved: landsData[26],
      }),
    },
    "1-4": {
      element: getStandardElement({
        backgroundColor: ROYAL_GUARD_LANDS_BACKGROUND_COLOR,
        text: 27,
        textColor: "darkblue",
        reserved: landsData[27],
      }),
    },
    "3-4": {
      element: getStandardElement({
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 3,
        reserved: landsData[3],
      }),
    },
    "4-4": {
      element: getStandardElement({
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 1,
        reserved: landsData[1],
      }),
    },
    "5-4": {
      element: getStandardElement({
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 5,
        reserved: landsData[5],
      }),
    },
    "3-5": {
      element: getStandardElement({
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 4,
        reserved: landsData[4],
      }),
    },
    "4-5": {
      element: getStandardElement({
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 2,
        reserved: landsData[2],
      }),
    },
    "5-5": {
      element: getStandardElement({
        backgroundColor: ULTRA_PREMIUM_LANDS_BACKGROUND_COLOR,
        text: 6,
        reserved: landsData[6],
      }),
    },
    "0-3": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "1-3": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "2-3": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "3-3": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "4-3": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "5-3": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "6-3": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "2-4": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "2-5": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "2-6": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "3-6": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "4-6": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "5-6": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "6-6": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "6-5": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
    "6-4": {
      element: getStandardElement({
        backgroundColor: YELLOW_BRICK_ROAD_LANDS_BACKGROUND_COLOR,
      }),
    },
  };

  return elementData;
};

const getGridData = (n = 2, landsData) => {
  let gridTemplateColumns = "";
  let gridTemplateRows = "";
  let gridTemplateAreas = "";

  const elements = [];

  const elementData = getElementData(landsData);

  for (let r = 0; r < n; r++) {
    gridTemplateColumns += `${squareWidth}px `;
    gridTemplateRows += `${squareWidth}px `;

    let gridTemplateAreasForRow = "";

    for (let c = 0; c < n; c++) {
      const currentIndex = elements.length;
      const currentKey = `c${currentIndex} `;
      gridTemplateAreasForRow += currentKey;
      elements.push(
        <div
          key={currentKey}
          style={{
            // backgroundColor: `rgb(24, ${Math.random() * 256}, 42)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          //   backgroundColor={elementData[currentIndex].backgroundColor}
          //   backgroundColor={`rgb(${Math.random() * 256}, 24, 42)`}
        >
          <div
            style={{
              //   backgroundColor: `rgb(${Math.random() * 256}, 24, 42)`,
              textAlign: "center",
              fontFamily: `"Tajawal", sans-serif`,
              fontSize: 16,
              color: "white",
            }}
          >
            {elementData?.[`${c}-${r}`]?.element ||
              getStandardElement({
                // backgroundColor: `rgb(24, ${Math.random() * 256 + 125}, 42)`,
                // backgroundColor: `rgb(24, ${Math.random() * 256 + 125}, 42)`,
                backgroundColor: grassColors[c][r],
              })}
          </div>
        </div>
      );
    }

    gridTemplateAreas += `${gridTemplateAreasForRow}\n`;
  }

  return {
    gridTemplateColumns: gridTemplateColumns.trim(),
    gridTemplateRows: gridTemplateRows.trim(),
    gridTemplateAreas: gridTemplateAreas.trim(),
    elements,
  };
};

const MiniMap = ({ userLandsData = defaultData.landsData }) => {
  const landsData = Object.assign({}, userLandsData);

  const { gridTemplateColumns, gridTemplateRows, gridTemplateAreas, elements } =
    getGridData(10, landsData);

  return (
    <div
      className="LandsPreview"
      style={{
        backgroundColor: "green",
        display: "grid",
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplateAreas,
      }}
    >
      {elements}
    </div>
  );
};

export default MiniMap;
