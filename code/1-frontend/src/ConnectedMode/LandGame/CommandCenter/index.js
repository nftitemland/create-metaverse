import { constants } from "../mapTools";

const TextComponent = ({
  text,
  fontSize = 18,
  fontFamily = '"Tajawal", sans-serif',
}) => {
  return (
    <div
      style={{
        width: "90%",
        // height: "90%",

        // height: mapHeight,
        // display: "block",
        // maxHeight: 500,

        fontSize,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          fontFamily,
          width: "90%",
          // height: "90%",
          color: "white",
          textAlign: "left",
        }}
      >
        {text}
      </div>
    </div>
  );
};

const TownHallCommandPanel = ({ currentlySelected, userData, gameData }) => {
  const data = gameData.townHallIdToData[currentlySelected.id];

  const userOwnsTownHall = data && data.userId === userData.userId;

  return (
    <>
      <TextComponent
        text={`Town Hall ${currentlySelected.id}`}
        fontSize={20}
        fontFamily={'"Amaranth", sans-serif'}
      />
      {userOwnsTownHall && (
        <>
          <div
            style={{
              fontFamily: '"Tajawal", sans-serif',
              width: "100%",
              // height: "100%",
              marginLeft: 10,
              marginRight: 10,
              // height: "90%",
              color: "white",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            {"Yield: 100 Pixie"}
          </div>
        </>
      )}
      {!userOwnsTownHall && !!data && (
        <>
          <div
            style={{
              fontFamily: '"Tajawal", sans-serif',
              width: "100%",
              // height: "100%",
              marginLeft: 10,
              marginRight: 10,
              // height: "90%",
              color: "white",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            {`Owned by: ${data.userId}`}
          </div>
        </>
      )}
      {!userOwnsTownHall && !data && (
        <>
          <TextComponent text={`Purchase for 1000 Pixie:`} />
          <div
            style={{
              // width: "90%",
              // height: "100%",
              height: 40,

              // height: mapHeight,
              // display: "block",
              // maxHeight: 500,

              fontSize: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                fontFamily: '"Amaranth", sans-serif',
                width: "100%",
                height: "100%",
                marginLeft: 10,
                marginRight: 10,
                // height: "90%",
                color: "black",
                textAlign: "center",
                fontSize: 19,
              }}
            >
              {"Purchase"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

/*
  TownHall States:

    1. Owned
    2. Self owned
    3. buyable
*/

const CommandCenter = ({
  squareWidth,
  dim,
  currentlySelected,
  setCurrentlySelected,
  userData,
  gameData,
  setGameData,
}) => {
  return (
    <div
      style={{
        width: squareWidth * (dim + 0.5),
        maxWidth: "90%",
        height: 200,

        backgroundColor: "blue",
        // height: mapHeight,
        // display: "block",
        // maxHeight: 500,

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          height: "90%",

          backgroundColor: "lightblue",
          // height: mapHeight,
          // display: "block",
          // maxHeight: 500,

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: 280,
            // width: 280,
            height: 107,

            backgroundColor: "darkblue",
            // height: mapHeight,
            // display: "block",
            // maxHeight: 500,

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {currentlySelected?.type === constants.buildingTypes.TOWN_HALL && (
            <TownHallCommandPanel
              currentlySelected={currentlySelected}
              userData={userData}
              gameData={gameData}
            />
          )}
        </div>

        {userData && (
          <div
            style={{
              width: "90%",
              maxWidth: 280,
              // width: 280,
              height: 50,

              backgroundColor: "darkblue",
              // height: mapHeight,
              // display: "block",
              // maxHeight: 500,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "90%",
                height: "100%",

                // height: mapHeight,
                // display: "block",
                // maxHeight: 500,

                fontSize: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: '"Amaranth", sans-serif',
                  width: "100%",
                  // height: "90%",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {`🧚‍♀️ ${userData.artPoints} Pixie Crystals`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandCenter;
