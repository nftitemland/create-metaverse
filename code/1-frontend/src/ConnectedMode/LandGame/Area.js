import getWarZoneOneData from "./landData/getWarZoneOneData";
import { getGridData } from "./mapTools";

const Area = ({
  windowWidth,
  windowHeight,
  // area,
  n = 10,
  m = n,
  // animeTime,
  grassColors,
  // selectedLandData,
  // setSelectedLandData,
  // updateDialogMode,
  // setNftPreviewDialogData,
  // mainGroundColor,
  squareWidth,
  mobileMode,
  currentlySelected,
  setCurrentlySelected,
  gameData,
}) => {
  const warZoneOneData = getWarZoneOneData({
    squareWidth,
    currentlySelected,
    setCurrentlySelected,
  });

  const { gridTemplateColumns, gridTemplateRows, gridTemplateAreas, elements } =
    getGridData({
      mobileMode,
      n,
      m,
      grassColors,
      landsData: null,
      // area,
      squareWidth,
      // animeTime,
      // selectedLandData,
      // setSelectedLandData,
      // updateDialogMode,
      // setNftPreviewDialogData,
      windowWidth,
      windowHeight,
      // mainGroundColor,
      providedElementData: warZoneOneData,
    });

  return (
    <div
      style={{
        backgroundColor: "green",
        display: "grid",
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplateAreas,
        // overflow: "scroll",
        // width: "100%",
      }}
    >
      {elements}
    </div>
  );
};

// const hours = new Date().getHours();
// const isDayTime = hours > 6 && hours < 20;
// const mainGroundColor = isDayTime ? "#4cb4df" : "darkblue";

// const grassColors = getGrassColors(50);
// const groundColors = getGroundColors(50, mainGroundColor);

// const MiniMap2 = ({
//   userDataLandClaim = {},
//   windowWidth,
//   windowHeight,
//   selectedLandData,
//   setSelectedLandData,
//   height,
//   updateDialogMode,
//   setNftPreviewDialogData,
// }) => {
//   // const [selectedLandData, setSelectedLandData] = useState({
//   //   propertyNumber: null,
//   //   area: null,
//   // });
//   // const [animeTime, setAnimeTime] = useState(1);
//   const animeTime = 2;
//   // const [grassColors, setGrassColors] = useState(getGrassColors(50));

//   // const grassColors = getGrassColors(50);

//   // useEffect(() => {
//   //   const intervalNumber = setInterval(() => {
//   //     const newAnimeTime = (animeTime + 1) % 1000000;
//   //     setAnimeTime(newAnimeTime);

//   //     // if (animeTime % 4 === 0) {
//   //     //   setGrassColors(getGrassColors(50));
//   //     // }
//   //   }, 2000);
//   //   return () => {
//   //     clearInterval(intervalNumber);
//   //   };
//   // }, [animeTime]);

//   const mobileMode = windowWidth < 1000;

//   const userLandsData = userDataLandClaim?.metaverseLandData || {};

//   const styles = getStyles({
//     windowWidth,
//     height,
//     mobileMode,
//   });

//   return (
//     <div className={"MiniMap2"} id={"MiniMap2"} style={styles.landsContainer}>
//       <div style={styles.landsMeta}>
//         <div style={styles.areaRow1}>
//           <Area
//             mobileMode={mobileMode}
//             windowWidth={windowWidth}
//             windowHeight={windowHeight}
//             userLandsData={userLandsData}
//             area={areaNames.HIGHER_REALM}
//             m={24}
//             n={22}
//             animeTime={animeTime}
//             grassColors={grassColors}
//             selectedLandData={selectedLandData}
//             setSelectedLandData={setSelectedLandData}
//             updateDialogMode={updateDialogMode}
//             setNftPreviewDialogData={setNftPreviewDialogData}
//           />
//         </div>
//         <div style={styles.areaRow1}>
//           <Area
//             mobileMode={mobileMode}
//             windowWidth={windowWidth}
//             windowHeight={windowHeight}
//             userLandsData={userLandsData}
//             area={areaNames.FLAMINGO_LAND}
//             m={28}
//             n={29}
//             animeTime={animeTime}
//             grassColors={grassColors}
//             selectedLandData={selectedLandData}
//             setSelectedLandData={setSelectedLandData}
//             updateDialogMode={updateDialogMode}
//             setNftPreviewDialogData={setNftPreviewDialogData}
//           />
//           <Area
//             mobileMode={mobileMode}
//             windowWidth={windowWidth}
//             windowHeight={windowHeight}
//             userLandsData={userLandsData}
//             area={areaNames.UPPER_POI}
//             grassColors={grassColors}
//             selectedLandData={selectedLandData}
//             setSelectedLandData={setSelectedLandData}
//             updateDialogMode={updateDialogMode}
//             setNftPreviewDialogData={setNftPreviewDialogData}
//           />
//         </div>
//         <div style={styles.areaRow1}>
//           <Area
//             mobileMode={mobileMode}
//             windowWidth={windowWidth}
//             windowHeight={windowHeight}
//             userLandsData={userLandsData}
//             area={areaNames.FLAMINGO_VALLEY}
//             m={28}
//             n={14}
//             animeTime={animeTime}
//             grassColors={grassColors}
//             selectedLandData={selectedLandData}
//             setSelectedLandData={setSelectedLandData}
//             updateDialogMode={updateDialogMode}
//             setNftPreviewDialogData={setNftPreviewDialogData}
//           />
//         </div>
//         <div style={styles.areaRow1}>
//           <Area
//             mobileMode={mobileMode}
//             windowWidth={windowWidth}
//             windowHeight={windowHeight}
//             userLandsData={userLandsData}
//             area={areaNames.PROMO}
//             m={28}
//             n={30}
//             animeTime={animeTime}
//             mainGroundColor={mainGroundColor}
//             grassColors={groundColors}
//             selectedLandData={selectedLandData}
//             setSelectedLandData={setSelectedLandData}
//             updateDialogMode={updateDialogMode}
//             setNftPreviewDialogData={setNftPreviewDialogData}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

export default Area;
