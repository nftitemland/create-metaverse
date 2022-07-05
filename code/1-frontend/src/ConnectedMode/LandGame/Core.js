import { getGrassColors } from "./mapTools";
import Area from "./Area";
import CommandCenter from "./CommandCenter";
// const hours = new Date().getHours();
// const isDayTime = hours > 6 && hours < 20;
// const mainGroundColor = isDayTime ? "#4cb4df" : "darkblue";

// const grassColors = getGrassColors(50);
// const groundColors = getGroundColors(50, mainGroundColor);

const DIM = 50;

const grassColors = getGrassColors(DIM);

const mapHeight = 500;
// const squareWidth =

const Core = ({
  // userDataLandClaim = {},
  windowWidth,
  windowHeight,
  mobileMode,
  currentlySelected,
  setCurrentlySelected,
  gameData,
  setGameData,
  userData,
  // selectedLandData,
  // setSelectedLandData,
  // height,
  // updateDialogMode,
  // setNftPreviewDialogData,
}) => {
  // const [selectedLandData, setSelectedLandData] = useState({
  //   propertyNumber: null,
  //   area: null,
  // });
  // const [animeTime, setAnimeTime] = useState(1);
  // const animeTime = 2;
  // const [grassColors, setGrassColors] = useState(getGrassColors(50));

  // useEffect(() => {
  //   const intervalNumber = setInterval(() => {
  //     const newAnimeTime = (animeTime + 1) % 1000000;
  //     setAnimeTime(newAnimeTime);

  //     // if (animeTime % 4 === 0) {
  //     //   setGrassColors(getGrassColors(50));
  //     // }
  //   }, 2000);
  //   return () => {
  //     clearInterval(intervalNumber);
  //   };
  // }, [animeTime]);

  // const mobileMode = windowWidth < 1000;
  const squareWidth = mobileMode ? 18 : 22;

  return (
    <>
      <div
        style={{
          // width: "100%",
          // height: "100%",
          maxWidth: "90%",
          overflow: "scroll",

          height: mapHeight,
          // display: "block",
          // maxHeight: 500,

          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Area
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          n={DIM}
          m={DIM}
          squareWidth={squareWidth}
          // animeTime,
          grassColors={grassColors}
          gameData={gameData}
          // selectedLandData,
          // setSelectedLandData,
          // updateDialogMode,
          // setNftPreviewDialogData,
          // mainGroundColor,
          mobileMode={mobileMode}
          currentlySelected={currentlySelected}
          setCurrentlySelected={setCurrentlySelected}
        />
      </div>

      {gameData && (
        <CommandCenter
          squareWidth={squareWidth}
          dim={DIM}
          currentlySelected={currentlySelected}
          setCurrentlySelected={setCurrentlySelected}
          gameData={gameData}
          userData={userData}
        />
      )}
    </>
  );
};

export default Core;
