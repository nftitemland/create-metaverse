import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../constants";
import { getNTokenData } from "../../../utils/nToken";
import refreshUserData from "../../../api/refreshUserData";
// import Messages from "../Messages";
import "./World.css";
// import { ReactComponent as MiniPoi } from "./MiniPoi.svg";

const WORLD_HEIGHT = 312;
const SQUARE_HEIGHT = 26;
const SPACE_COUNT = WORLD_HEIGHT / SQUARE_HEIGHT - 1;

const metaverseActions = {
  MOVE_UP: "MOVE_UP",
  MOVE_LEFT: "MOVE_LEFT",
  MOVE_RIGHT: "MOVE_RIGHT",
  MOVE_DOWN: "MOVE_DOWN",
};

const updatePosition = async ({
  address,
  setIsLoading,
  metaverseAction,
  setUserData,
}) => {
  setIsLoading(true);

  try {
    const nTokenData = getNTokenData();

    await axios({
      method: "POST",
      url: `${API_BASE_URL}/expansive-world/user-data`,
      headers: {
        "nftitem-address": address,
        "nftitem-ntoken": nTokenData.nToken,
      },
      data: {
        metaverseAction,
      },
    });

    await refreshUserData({
      address,
      nToken: nTokenData.nToken,
      setUserData,
    });

    setIsLoading(false);
  } catch (err) {
    console.log("error in position update:", err);
    setIsLoading(false);
  }
};

function Navigator({
  address,
  isLoading,
  setIsLoading,
  userData,
  setUserData,
}) {
  const { xPosition = 0, yPosition = 0 } = userData;

  const leftButtonDisabled = isLoading || xPosition <= 0;
  const topButtonDisabled = isLoading || yPosition >= SPACE_COUNT;
  const rightButtonDisabled = isLoading || xPosition >= SPACE_COUNT;
  const bottomButtonDisabled = isLoading || yPosition <= 0;

  return (
    <div className={"Navigator"}>
      <div className={"NavigatorRow"}>
        <div
          style={{
            width: 20,
            height: 20,
          }}
        ></div>
        <div
          onClick={async () => {
            if (topButtonDisabled) {
              return;
            }

            await updatePosition({
              address,
              setIsLoading,
              metaverseAction: metaverseActions.MOVE_UP,
              setUserData,
            });
          }}
          className={
            topButtonDisabled ? "NavButton Up Disabled" : "NavButton Up"
          }
        ></div>
        <div
          style={{
            width: 20,
            height: 20,
          }}
        ></div>
      </div>
      <div className={"NavigatorRow"}>
        <>
          <div
            onClick={async () => {
              if (leftButtonDisabled) {
                return;
              }

              await updatePosition({
                address,
                setIsLoading,
                metaverseAction: metaverseActions.MOVE_LEFT,
                setUserData,
              });
            }}
            className={
              leftButtonDisabled ? "NavButton Left Disabled" : "NavButton Left"
            }
          ></div>
          <div
            style={{
              width: 60,
              minHeight: 25,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              // marginRight: 30,
            }}
          />
          <div
            onClick={async () => {
              if (rightButtonDisabled) {
                return;
              }

              await updatePosition({
                address,
                setIsLoading,
                metaverseAction: metaverseActions.MOVE_RIGHT,
                setUserData,
              });
            }}
            className={
              rightButtonDisabled
                ? "NavButton Right Disabled"
                : "NavButton Right"
            }
          ></div>
        </>
      </div>
      <div className={"NavigatorRow"}>
        <div
          style={{
            width: 20,
            height: 20,
          }}
        ></div>
        <div
          onClick={async () => {
            if (bottomButtonDisabled) {
              return;
            }

            await updatePosition({
              address,
              setIsLoading,
              metaverseAction: metaverseActions.MOVE_DOWN,
              setUserData,
            });
          }}
          className={
            bottomButtonDisabled ? "NavButton Down Disabled" : "NavButton Down"
          }
        ></div>
        <div
          style={{
            width: 20,
            height: 20,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Navigator;
