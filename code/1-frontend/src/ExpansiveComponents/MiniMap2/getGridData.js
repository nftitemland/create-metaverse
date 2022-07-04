// import getGrassColors from "./getGrassColors";
import getElementData from "./getElementData";
import getStandardElement from "./getStandardElement";

// const grassColors = getGrassColors(50);

const getGridData = ({
  mobileMode,
  n = 2,
  m = 2,
  landsData,
  area,
  squareWidth = 30,
  animeTime,
  grassColors,
  selectedLandData,
  setSelectedLandData,
  updateDialogMode,
  setNftPreviewDialogData,
  windowWidth,
  windowHeight,
  mainGroundColor,
  providedElementData = null,
}) => {
  let gridTemplateColumns = "";
  let gridTemplateRows = "";
  let gridTemplateAreas = "";

  const elements = [];

  const elementData =
    providedElementData ||
    getElementData({
      mobileMode,
      landsData,
      area,
      squareWidth,
      animeTime,
      m,
      n,
      selectedLandData,
      setSelectedLandData,
      updateDialogMode,
      setNftPreviewDialogData,
      windowWidth,
      windowHeight,
      mainGroundColor,
    });

  for (let i = 0; i < m; i++) {
    gridTemplateColumns += `${squareWidth}px `;
  }

  for (let r = 0; r < n; r++) {
    gridTemplateRows += `${squareWidth}px `;

    let gridTemplateAreasForRow = "";

    for (let c = 0; c < m; c++) {
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
                testCoords: `${c}-${r}`,
                backgroundColor: grassColors[c][r],
                squareWidth,
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

export default getGridData;
