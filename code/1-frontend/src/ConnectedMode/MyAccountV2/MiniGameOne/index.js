import React, { useEffect, useState } from "react";
import { dialogModes, API_BASE_URL } from "../../../constants";
import { getNTokenData } from "../../../utils/nToken";
import refreshUserData from "../../../api/refreshUserData";
import axios from "axios";
import "./MiniGameOne.css";

const gameModes = {
  MENU: "MENU",
  DEMO: "DEMO",
  PLAY: "PLAY",
};

const gameStates = {
  MENU: "MENU",
  GAME_PRE_POI: "GAME_PRE_POI",
  GAME_PICK_POI: "GAME_PICK_POI",
  GAME_POST_POI_WIN: "GAME_POST_POI_WIN",
  GAME_POST_POI_LOSE: "GAME_POST_POI_LOSE",
};

const Results = ({ winAmount }) => {
  return (
    <div className={"Results"}>
      <div className={"TextMeta"}>
        <div className={"Text"}>{`Awarded ${winAmount} Art Points`}</div>
      </div>

      {1 === 2 && (
        <div className={"PreviewMeta"}>
          <div
            className={"Text"}
            style={{
              width: "95%",
              textAlign: "left",
            }}
          >
            {`Check out NFT Item's new The Sandbox land plot!: `}
            <a
              alt="sandboxLink"
              href="https://opensea.io/assets/0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a/45356"
            >
              {"NFT Item in The Sandbox."}
            </a>
            {" This is NFT Item Land, downtown The Sandbox!"}
          </div>
          <div
            style={{
              width: "95%",
            }}
          >
            <a
              alt="sandboxLink"
              href="https://opensea.io/assets/0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a/45356"
            >
              <img
                style={{
                  width: "100%",
                }}
                src="https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/sandbox_land.jpeg"
                alt="thesandboximage"
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const GameMenu = ({
  setGameMode,
  address,
  setUserData,
  setGameState,
  isLoading,
  setIsLoading,
}) => {
  const buttonsAreDisabled = isLoading;

  const { cnTryGameButton, cnStartGameButton } = buttonsAreDisabled
    ? {
        cnTryGameButton: "TryGameButton Disabled",
        cnStartGameButton: "StartGameButton Disabled",
      }
    : {
        cnTryGameButton: "TryGameButton",
        cnStartGameButton: "StartGameButton",
      };

  return (
    <div className="GameMenu">
      <div className="ButtonsMeta">
        <div className="ButtonsMeta">
          <div
            className={cnTryGameButton}
            onClick={() => {
              setGameMode(gameModes.DEMO);
            }}
          >
            <div className="Label">{"Demo Mode"}</div>
          </div>
          <div
            className={cnStartGameButton}
            onClick={async () => {
              setIsLoading(true);

              const nTokenData = getNTokenData();

              await axios({
                method: "POST",
                url: `${API_BASE_URL}/expansive-world/user-data`,
                headers: {
                  "nftitem-address": address,
                  "nftitem-ntoken": nTokenData.nToken,
                },
                data: {
                  miniGameState: "START",
                },
              });

              await refreshUserData({
                address,
                nToken: nTokenData.nToken,
                setUserData,
              });

              // setGameMode(gameModes.PLAY);
              setGameState(gameStates.GAME_PRE_POI);
              setIsLoading(false);

              // console.log(`

              //     MEGA LOG: ${JSON.stringify(
              //       {
              //         HERE: "xx",
              //       },
              //       null,
              //       4
              //     )}

              // `);
            }}
          >
            <div className="Label">{"Play for Prize"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GSPostPickWin = ({ setGameState, demoMode, address, setUserData }) => {
  useEffect(() => {
    if (!demoMode) {
      Promise.resolve().then(async () => {
        const nTokenData = getNTokenData();

        await axios({
          method: "POST",
          url: `${API_BASE_URL}/expansive-world/user-data`,
          headers: {
            "nftitem-address": address,
            "nftitem-ntoken": nTokenData.nToken,
          },
          data: {
            miniGameState: "END",
          },
        });

        await refreshUserData({
          address,
          nToken: nTokenData.nToken,
          setUserData,
        });
      });
    }
  }, [setGameState, demoMode, address, setUserData]);

  return (
    <div
      className={"GSWin"}
      onClick={() => {
        if (!demoMode) {
          return;
        }
        setGameState(gameStates.MENU);
      }}
    >
      {demoMode && (
        <div className={"TextMeta"}>
          <div className={"Text"}>
            {"Won Demo. Press to return to game menu"}
          </div>
        </div>
      )}
    </div>
  );
};

const GSPostPickLose = ({ setGameState, demoMode, address, setUserData }) => {
  useEffect(() => {
    if (!demoMode) {
      Promise.resolve().then(async () => {
        const nTokenData = getNTokenData();

        await axios({
          method: "POST",
          url: `${API_BASE_URL}/expansive-world/user-data`,
          headers: {
            "nftitem-address": address,
            "nftitem-ntoken": nTokenData.nToken,
          },
          data: {
            miniGameState: "ENDL",
          },
        });

        await refreshUserData({
          address,
          nToken: nTokenData.nToken,
          setUserData,
        });
      });
    }
  }, [setGameState, demoMode, address, setUserData]);

  return (
    <div
      className={"GSLose"}
      onClick={() => {
        if (!demoMode) {
          return;
        }
        setGameState(gameStates.MENU);
      }}
    >
      {demoMode && (
        <div className={"TextMeta"}>
          <div className={"Text"}>
            {"Lost Demo. Press to return to game menu."}
          </div>
        </div>
      )}
    </div>
  );
};

const GSPoiPick = ({ setGameState }) => {
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (hasWon) {
        return;
      }
      setGameState(gameStates.GAME_POST_POI_LOSE);
    }, 3000);

    return () => {
      clearTimeout(t);
    };
  }, [setGameState, hasWon]);

  const r = Math.random() > 0.5;
  const r2 = Math.random() > 0.5;

  let cn = "GSPoiPick";

  if (r) {
    cn += " Alt1";
  }

  if (r2) {
    cn += " Alt2";
  }

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         cn,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  return (
    <div className={cn}>
      <div
        className={"PoiBox"}
        onClick={() => {
          setHasWon(true);
          setGameState(gameStates.GAME_POST_POI_WIN);
        }}
      >
        <img
          alt="Poi"
          src="https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_3.png"
          style={{
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};
const GSPrePoiPick = ({ setGameState }) => {
  useEffect(() => {
    setTimeout(() => {
      setGameState(gameStates.GAME_PICK_POI);
      // }, 3000 + Math.random() * 5000);
    }, 3000 + Math.random() * 5000);
  }, [setGameState]);

  return (
    <div className={"GSPrePoiPick"}>
      <div className={"TextMeta"}>
        <div className={"Text"}>{"PoiPoi will appear soon!"}</div>
      </div>
    </div>
  );
};

const GSMenu = ({ setGameMode, updateDialogMode, setGameState }) => {
  return (
    <div className="DemoModeMeta">
      <div className="Left">
        <div
          className="Button"
          onClick={() => {
            setGameMode(gameModes.MENU);
          }}
        >
          <div className="Label">{"Back"}</div>
        </div>
        <div
          className="Button"
          onClick={() => {
            updateDialogMode(dialogModes.minigame.MINI_GAME_ONE_MORE_INFO);
            // useDialog(dialogModes.minigame.MINI_GAME_ONE_MORE_INFO);
          }}
        >
          <div className="Label">{"How to Play"}</div>
        </div>
      </div>
      <div className="Right">
        <div
          className="StartButton"
          onClick={() => {
            setGameState(gameStates.GAME_PRE_POI);
          }}
        >
          <div className="Label">{"Start Game!"}</div>
        </div>
      </div>
    </div>
  );
};

const GameStateElement = ({
  gameState,
  setGameMode,
  updateDialogMode,
  setGameState,
  demoMode,
  userData,
  address,
  setUserData,
}) => {
  switch (gameState) {
    case gameStates.GAME_PRE_POI:
      return <GSPrePoiPick setGameState={setGameState} />;
    case gameStates.GAME_PICK_POI:
      return <GSPoiPick setGameState={setGameState} />;
    case gameStates.GAME_POST_POI_WIN:
      return (
        <GSPostPickWin
          setGameState={setGameState}
          demoMode={demoMode}
          setUserData={setUserData}
          address={address}
        />
      );
    case gameStates.GAME_POST_POI_LOSE:
      return (
        <GSPostPickLose
          setGameState={setGameState}
          demoMode={demoMode}
          setUserData={setUserData}
          address={address}
        />
      );
    default:
      if (userData.miniGameStart) {
        return <GSPoiPick setGameState={setGameState} />;
      }
      return (
        <GSMenu
          setGameMode={setGameMode}
          updateDialogMode={updateDialogMode}
          setGameState={setGameState}
        />
      );
  }
};

const MainElement = ({
  gameMode,
  setGameMode,
  updateDialogMode,
  gameState,
  setGameState,
  userData,
  setUserData,
  address,
  isLoading,
  setIsLoading,
}) => {
  if (!!userData.miniGameFinishAmount || userData?.miniGameFinishAmount === 0) {
    return <Results winAmount={userData.miniGameFinishAmount} />;
  }

  if (userData.miniGameStart) {
    return (
      <GameStateElement
        gameState={gameState}
        setGameState={setGameState}
        setGameMode={setGameMode}
        updateDialogMode={updateDialogMode}
        userData={userData}
        address={address}
        setUserData={setUserData}
      />
    );
  }

  switch (gameMode) {
    case gameModes.DEMO:
      return (
        <GameStateElement
          gameState={gameState}
          setGameState={setGameState}
          setGameMode={setGameMode}
          updateDialogMode={updateDialogMode}
          demoMode={true}
          userData={userData}
          address={address}
          setUserData={setUserData}
        />
      );

    default:
      return (
        <GameMenu
          setGameMode={setGameMode}
          address={address}
          setUserData={setUserData}
          setGameState={setGameState}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      );
  }
};

function MiniGameOne({
  userData,
  updateDialogMode,
  setUserData,
  address,
  isLoading,
  setIsLoading,
}) {
  const [gameMode, setGameMode] = useState(gameModes.MENU);
  const [gameState, setGameState] = useState(gameStates.MENU);
  const [hoveringTitle, setHoveringTitle] = useState(false);

  return (
    <div className="MiniGameOneMeta">
      <div className="MiniGameOne">
        <div className="TopBar">
          <div className="TitleTextMeta">
            <div
              className={hoveringTitle ? "TitleTextBox Alt" : "TitleTextBox"}
              onClick={() => {
                setHoveringTitle(true);

                setTimeout(() => {
                  setHoveringTitle(false);
                }, 6000);
              }}
            >
              <div className="TitleText">{"MiniGame"}</div>
              <div
                style={{
                  width: 5,
                  height: 2,
                  // borderRadius: 3,
                  // backgroundColor: "greenyellow",
                  // textAlign: "center",
                }}
              />
              {
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 3,
                    backgroundColor: [
                      gameStates.GAME_POST_POI_WIN,
                      gameStates.GAME_POST_POI_LOSE,
                    ].includes(gameState)
                      ? "#2bc15f"
                      : "greenyellow",
                    textAlign: "center",
                    fontFamily: `"Amaranth", sans-serif`,
                  }}
                >
                  {"!"}
                </div>
              }
            </div>
          </div>
          {hoveringTitle && (
            <div className="SubtitleTextMeta">
              <div className="SubtitleTextBox">
                <div className="SubtitleText">{"Ends 11:59pm EST Nov. 30"}</div>
              </div>
            </div>
          )}
        </div>
        <div className="MidBar">
          <MainElement
            gameMode={gameMode}
            setGameMode={setGameMode}
            updateDialogMode={updateDialogMode}
            gameState={gameState}
            setGameState={setGameState}
            userData={userData}
            setUserData={setUserData}
            address={address}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className="BottomBar"></div>
      </div>
    </div>
  );
}

export default MiniGameOne;
