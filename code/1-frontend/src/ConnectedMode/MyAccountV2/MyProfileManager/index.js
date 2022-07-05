import PublicProfilePreview from "./PublicProfilePreview";
import VisibilitySelectors from "./VisibilitySelectors";
import "./MyProfileManager.css";
// import axios from "axios";
// import { getNTokenData } from "../../../utils/nToken";
// import refreshUserData from "../../../api/refreshUserData";
// import refreshProfiles from "../../../api/refreshProfiles";
// import {
//   API_BASE_URL,

//   // NULL_ADDRESS, NULL_USER_ID
// } from "../../../constants";
// import delay from "../../../utils/delay";
// import { useState } from "react";

// const BATTLE_MODE = "BATTLE_MODE";

// const setProfileVisibility = async ({
//   address,
//   disabled,
//   setIsLoading,
//   setUserData,
//   setProfiles,
// }) => {
//   if (disabled) {
//     return;
//   }

//   try {
//     setIsLoading(true);

//     const nTokenData = getNTokenData();

//     await axios({
//       method: "POST",
//       url: `${API_BASE_URL}/expansive-world/user-data`,
//       headers: {
//         "nftitem-address": address,
//         "nftitem-ntoken": nTokenData?.nToken,
//       },
//       data: {
//         public: true,
//       },
//     });

//     await refreshUserData({
//       address,
//       nToken: nTokenData.nToken,
//       setUserData,
//     });
//     refreshProfiles({
//       setProfiles,
//     });
//     setIsLoading(false);
//   } catch (err) {
//     console.log("error in updating visibility", err);
//     // TODO set status

//     setIsLoading(false);
//   }
// };

// const PUBLIC = "PUBLIC";

const MyProfileManager = ({
  userData,
  isLoading,
  address,
  setIsLoading,
  setUserData,
  setProfiles,
  displaySelectUsernameVisibility = true,
  displayPreviewMyProfile = true,
  displaySelectAddressVisibility = true,
  displaySelectArtPointsVisibility = true,
  displayBattleModeSelector = true,
  displaySelectCharacterPictureVisibility,
  displaySelectGamePoiMetaverseVisibility,
  width,
  updateStatus,
}) => {
  // const [localLoading, setLocalLoading] = useState(null);

  // const setProfileVisibilityButtonIsDisabled = isLoading;

  //   console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         userData,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  const profileIsPublic = userData.public;

  // const setPublicIsDisabled =
  //   setProfileVisibilityButtonIsDisabled || profileIsPublic;
  // const setPrivateIsDisabled =
  //   setProfileVisibilityButtonIsDisabled || !profileIsPublic;

  return (
    <div className={"MPMMeta"}>
      <div className={"MPM"} style={{ width }}>
        {/* <div className="TitleMeta">
          <div className="TitleTextMeta">
            <div className="TitleText">{"My Profile"}</div>
          </div>
        </div>
        <div className={"PublicSwitchMeta"}>
          <div className={"Left"}>
            <div className={"TextMeta"}>
              <div className={"Text"}>
                {userData.public ? (
                  <>
                    {"Global Public Mode"}
                    <br />
                    {
                      <div
                        style={{
                          fontFamily: `"Tajawal", sans-serif`,
                          marginTop: 15,
                        }}
                      >
                        {
                          "User selected public-enabled profile info and HP are currently public"
                        }
                      </div>
                    }
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 14 }}>{"Global Private Mode"}</div>

                    <br />
                    {
                      <div
                        style={{
                          fontFamily: `"Tajawal", sans-serif`,
                          marginTop: 15,
                        }}
                      >
                        {"All user data is currently private"}
                      </div>
                    }
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={"Right"}>
            <div
              className={
                setPublicIsDisabled
                  ? "SetProfileVisibilityButton Disabled"
                  : "SetProfileVisibilityButton"
              }
              onClick={async () => {
                if (
                  address === NULL_ADDRESS ||
                  userData?.userId === NULL_USER_ID
                ) {
                  updateStatus("Login Required");
                  return;
                }

                await setProfileVisibility({
                  address,
                  disabled: setPublicIsDisabled,
                  setIsLoading,
                  setUserData,
                  setProfiles,
                });
              }}
            >
              <div className={"Label"}>{"Set to Global Public Mode"}</div>
            </div>
            <div
              className={
                setPrivateIsDisabled
                  ? "SetProfileVisibilityButton Disabled"
                  : "SetProfileVisibilityButton"
              }
              onClick={async () => {
                if (
                  address === NULL_ADDRESS ||
                  userData?.userId === NULL_USER_ID
                ) {
                  updateStatus("Login Required");
                  return;
                }

                await setProfileVisibility({
                  address,
                  disabled: setPrivateIsDisabled,
                  setIsLoading,
                  setUserData,
                  setProfiles,
                });
              }}
            >
              <div className={"Label"}>{"Set to Global Private Mode"}</div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: 40,
            backgroundColor: "#070b22",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        {displayBattleModeSelector && (
          <>
            <div
              style={{
                width: "100%",
                height: 60,
                backgroundColor: "#212746",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  // backgroundColor: "pink",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontFamily: `"Amaranth", sans-serif`,
                    // fontFamily: `"Tajawal", sans-serif`,
                    // fontSize: 26,
                    color: "white",
                  }}
                >
                  {"Battle Mode"}
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  // backgroundColor: "pink",
                  backgroundColor:
                    localLoading === BATTLE_MODE
                      ? "#070b22"
                      : userData.battleMode
                      ? "#970000"
                      : "unset",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  cursor: isLoading ? "unset" : "pointer",
                  userSelect: "none",
                }}
                onClick={async () => {
                  if (localLoading || isLoading) {
                    return;
                  }

                  if (
                    address === NULL_ADDRESS ||
                    userData?.userId === NULL_USER_ID
                  ) {
                    updateStatus("Login Required");
                    return;
                  }

                  setLocalLoading(BATTLE_MODE);
                  setIsLoading(true);

                  try {
                    const nTokenData = getNTokenData();

                    await axios({
                      method: "POST",
                      url: `${API_BASE_URL}/expansive-world/user-data`,
                      headers: {
                        "nftitem-address": address,
                        "nftitem-ntoken": nTokenData?.nToken,
                      },
                      data: {
                        battleMode: true,
                      },
                    });

                    await refreshUserData({
                      address,
                      nToken: nTokenData.nToken,
                      setUserData,
                    });

                    setIsLoading(false);
                    setLocalLoading(null);
                  } catch (err) {
                    console.log("error in changing battle mode:", err);

                    setIsLoading(false);
                    setLocalLoading(null);
                  }
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontFamily: `"Amaranth", sans-serif`,
                    // fontFamily: `"Tajawal", sans-serif`,
                    // fontSize: 26,
                    color: userData.battleMode ? "white" : "lightgrey",
                  }}
                >
                  {userData.battleMode
                    ? userData.public
                      ? "On🔥"
                      : "currently off"
                    : "off"}
                </div>
                {userData.battleMode && !userData.public && (
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: `"Amaranth", sans-serif`,
                      // fontFamily: `"Tajawal", sans-serif`,
                      fontSize: 10,
                      color: userData.battleMode ? "white" : "lightgrey",
                    }}
                  >
                    {"on in Global Public Mode"}
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                // height: 60,
                backgroundColor: "#212746",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 3,
                  backgroundColor: "rgb(7, 11, 34)",
                }}
              />
              <div
                style={{
                  marginTop: 12,
                  marginBottom: 8,
                  width: "90%",
                  textAlign: "left",
                  // fontFamily: `"Amaranth", sans-serif`,
                  fontFamily: `"Tajawal", sans-serif`,
                  // fontSize: 26,
                  color: "white",
                }}
              >
                Earn hourly Pixie Crystal rewards by keeping Battle Mode on. The
                more Pixie Crystals held, the better the reward!
              </div>
            </div>
          </>
        )} */}

        <VisibilitySelectors
          updateStatus={updateStatus}
          profileIsPublic={profileIsPublic}
          userData={userData}
          address={address}
          setIsLoading={setIsLoading}
          setUserData={setUserData}
          isLoading={isLoading}
          setProfiles={setProfiles}
          displaySelectUsernameVisibility={displaySelectUsernameVisibility}
          displaySelectAddressVisibility={displaySelectAddressVisibility}
          displaySelectArtPointsVisibility={displaySelectArtPointsVisibility}
          displaySelectCharacterPictureVisibility={
            displaySelectCharacterPictureVisibility
          }
          displaySelectGamePoiMetaverseVisibility={
            displaySelectGamePoiMetaverseVisibility
          }
        />
        {displayPreviewMyProfile && (
          <PublicProfilePreview userData={userData} address={address} />
        )}
      </div>
    </div>
  );
};

export default MyProfileManager;
