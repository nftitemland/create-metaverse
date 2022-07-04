import "./VisibilitySelectors.css";
import { getNTokenData } from "../../../../utils/nToken";
import refreshUserData from "../../../../api/refreshUserData";
import refreshProfiles from "../../../../api/refreshProfiles";
import {
  API_BASE_URL,
  NULL_ADDRESS,
  NULL_USER_ID,
} from "../../../../constants";
import axios from "axios";
import { useState } from "react";
import BasePoi from "../../../World/PoiLand/BasePoi";

const ADDRESS = "ADDRESS";
const ART_POINTS = "ART_POINTS";
const METAVERSE_PRESENT = "METAVERSE_PRESENT";
const USERNAME = "USERNAME";
// const CHARACTER_PICTURE = "CHARACTER_PICTURE";

const CoolCircle = ({ profileIsPublic, publicMode }) => {
  return (
    <div
      style={{
        height: 20,
        width: 20,
        backgroundColor: publicMode
          ? profileIsPublic
            ? "green"
            : "orange"
          : "darkgray",
        borderRadius: "50%",
      }}
    />
  );
};

const DisplayedText = ({
  publicMode,
  cnElementWithLoading,
  profileIsPublic,
}) => {
  return (
    <div className={cnElementWithLoading}>
      <div className="Text2">
        {publicMode ? (
          profileIsPublic ? (
            "public"
          ) : (
            <>
              {"currently private"}
              <br />
              {"(public when set to Global Public Mode)"}
            </>
          )
        ) : (
          "private"
        )}
      </div>
    </div>
  );
};

const updateAttributeVisibility = async ({
  visibility,
  disabled,
  setIsLoading,
  setUserData,
  address,
  setLocalLoading,
  setProfiles,
  updateStatus,
  userData,
}) => {
  if (disabled) {
    return;
  }

  if (address === NULL_ADDRESS || userData?.userId === NULL_USER_ID) {
    updateStatus("Login Required");
    return;
  }

  try {
    setIsLoading(true);
    setLocalLoading(visibility);

    const nTokenData = getNTokenData();
    await axios({
      method: "POST",
      url: `${API_BASE_URL}/expansive-world/user-data`,
      headers: {
        "nftitem-address": address,
        "nftitem-ntoken": nTokenData?.nToken,
      },
      data: {
        visibility,
      },
    });

    await refreshUserData({
      address,
      nToken: nTokenData.nToken,
      setUserData,
    });
    refreshProfiles({
      setProfiles,
    });
    setIsLoading(false);
    // FIXNOTE: Causes warning if dialog closes
    setLocalLoading(null);
  } catch (err) {
    console.log("error in saving name", err);
    // TODO set status

    setIsLoading(false);
    setLocalLoading(null);
  }
};

const VisibilitySelectors = ({
  updateStatus,
  userData,
  address,
  setIsLoading,
  setUserData,
  isLoading,
  setProfiles,
  displaySelectUsernameVisibility,
  displaySelectAddressVisibility,
  displaySelectArtPointsVisibility,
  displaySelectCharacterPictureVisibility = false,
  displaySelectGamePoiMetaverseVisibility = false,
  profileIsPublic,
}) => {
  const [localLoading, setLocalLoading] = useState(null);

  const { visibilities = {} } = userData;

  const addressIsPublic = visibilities.ADDRESS;
  // const characterPictureIsPublic = visibilities.CHARACTER_PICTURE;
  const artPointsArePublic = visibilities.ART_POINTS;
  const metaverseIsPublic = visibilities.METAVERSE_PRESENT;
  const usernameIsPublic = visibilities.USERNAME;

  const updateVisibilityDisabled = isLoading;

  const cnAddressElementWithLoading =
    updateVisibilityDisabled && localLoading === ADDRESS
      ? "Element Touch Loading"
      : "Element Touch";
  // const cnCharacterPictureElementWithLoading =
  //   updateVisibilityDisabled && localLoading === CHARACTER_PICTURE
  //     ? "Element Touch Loading"
  //     : "Element Touch";
  const cnArtPointsElementWithLoading =
    updateVisibilityDisabled && localLoading === ART_POINTS
      ? "Element Touch Loading"
      : "Element Touch ";
  const cnMetaverseElementWithLoading =
    updateVisibilityDisabled && localLoading === METAVERSE_PRESENT
      ? "Element Touch Loading"
      : "Element Touch ";
  const cnUsernameElementWithLoading =
    updateVisibilityDisabled && localLoading === USERNAME
      ? "Element Touch Loading"
      : "Element Touch ";

  const updateUsernameVisibility = async () => {
    await updateAttributeVisibility({
      visibility: USERNAME,
      disabled: updateVisibilityDisabled,
      setIsLoading,
      setUserData,
      address,
      setLocalLoading,
      setProfiles,
      updateStatus,
      userData,
    });
  };

  const updateAddressVisibility = async () => {
    await updateAttributeVisibility({
      visibility: ADDRESS,
      disabled: updateVisibilityDisabled,
      setIsLoading,
      setUserData,
      address,
      setLocalLoading,
      setProfiles,
      updateStatus,
      userData,
    });
  };

  // const updateCharacterPictureVisibility = async () => {
  //   await updateAttributeVisibility({
  //     visibility: CHARACTER_PICTURE,
  //     disabled: updateVisibilityDisabled,
  //     setIsLoading,
  //     setUserData,
  //     address,
  //     setLocalLoading,
  //     setProfiles,
  //     updateStatus,
  //     userData,
  //   });
  // };

  const updateArtPointsVisibility = async () => {
    await updateAttributeVisibility({
      visibility: ART_POINTS,
      disabled: updateVisibilityDisabled,
      setIsLoading,
      setUserData,
      address,
      setLocalLoading,
      setProfiles,
      updateStatus,
      userData,
    });
  };

  const updateMetaverseVisibility = async () => {
    await updateAttributeVisibility({
      visibility: METAVERSE_PRESENT,
      disabled: updateVisibilityDisabled,
      setIsLoading,
      setUserData,
      address,
      setLocalLoading,
      setProfiles,
      updateStatus,
      userData,
    });
  };

  return (
    <div className={"VisibilitySelectorsMetaContainer"}>
      <div className={"VisibilitySelectorsMeta"}>
        <div className="TitleMeta2">
          <div className="TitleTextMeta2">
            <div className="TitleText2">{"Profile Info"}</div>
          </div>
        </div>
        <div className="SelectorsSection">
          {displaySelectUsernameVisibility && (
            <>
              <div className="ItemA1" onClick={updateUsernameVisibility}>
                <div className={cnUsernameElementWithLoading}>
                  <div className="Text">{"Username"}</div>
                </div>
              </div>
              <div className="ItemB1" onClick={updateUsernameVisibility}>
                <DisplayedText
                  profileIsPublic={profileIsPublic}
                  publicMode={usernameIsPublic}
                  cnElementWithLoading={cnUsernameElementWithLoading}
                />
              </div>
              <div className="ItemC1" onClick={updateUsernameVisibility}>
                <div className={cnUsernameElementWithLoading}>
                  <CoolCircle
                    profileIsPublic={profileIsPublic}
                    publicMode={usernameIsPublic}
                  />
                </div>
              </div>
            </>
          )}
          {displaySelectArtPointsVisibility && (
            <>
              <div className="ItemA" onClick={updateArtPointsVisibility}>
                <div className={cnArtPointsElementWithLoading}>
                  <div className="Text">{"Pixie Crystals"}</div>
                </div>
              </div>
              <div className="ItemB" onClick={updateArtPointsVisibility}>
                <DisplayedText
                  profileIsPublic={profileIsPublic}
                  publicMode={artPointsArePublic}
                  cnElementWithLoading={cnArtPointsElementWithLoading}
                />
              </div>
              <div className="ItemC" onClick={updateArtPointsVisibility}>
                <div className={cnArtPointsElementWithLoading}>
                  <CoolCircle
                    profileIsPublic={profileIsPublic}
                    publicMode={artPointsArePublic}
                  />
                </div>
              </div>
            </>
          )}
          {displaySelectAddressVisibility && (
            <>
              <div className="ItemD" onClick={updateAddressVisibility}>
                <div className={cnAddressElementWithLoading}>
                  <div className="Text">{"Address"}</div>
                </div>
              </div>
              <div className="ItemE" onClick={updateAddressVisibility}>
                <DisplayedText
                  profileIsPublic={profileIsPublic}
                  publicMode={addressIsPublic}
                  cnElementWithLoading={cnAddressElementWithLoading}
                />
              </div>
              <div className={"ItemF"} onClick={updateAddressVisibility}>
                <div className={cnAddressElementWithLoading}>
                  <CoolCircle
                    profileIsPublic={profileIsPublic}
                    publicMode={addressIsPublic}
                  />
                </div>
              </div>
            </>
          )}
          {/* {displaySelectCharacterPictureVisibility && (
            <>
              <div
                className="ItemD1"
                onClick={updateCharacterPictureVisibility}
              >
                <div className={cnCharacterPictureElementWithLoading}>
                  <div className="Text">{"Character Picture"}</div>
                </div>
              </div>
              <div className="ItemQ" onClick={updateCharacterPictureVisibility}>
                <DisplayedText
                  profileIsPublic={profileIsPublic}
                  publicMode={characterPictureIsPublic}
                  cnElementWithLoading={cnCharacterPictureElementWithLoading}
                />
              </div>
              <div
                className={"ItemF1"}
                onClick={updateCharacterPictureVisibility}
              >
                <div className={cnCharacterPictureElementWithLoading}>
                  <CoolCircle
                    profileIsPublic={profileIsPublic}
                    publicMode={characterPictureIsPublic}
                  />
                </div>
              </div>
            </>
          )} */}
          {displaySelectGamePoiMetaverseVisibility && (
            <>
              <div className="ItemG" onClick={updateMetaverseVisibility}>
                <div className={cnMetaverseElementWithLoading}>
                  <div
                    className="Text"
                    style={{
                      fontSize: 15,
                    }}
                  >
                    <> {"GamePoi Metaverse PoiPoi"} </>{" "}
                    <BasePoi
                      color={
                        metaverseIsPublic
                          ? profileIsPublic
                            ? "green"
                            : "orange"
                          : "grey"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="ItemH" onClick={updateMetaverseVisibility}>
                {
                  <DisplayedText
                    profileIsPublic={profileIsPublic}
                    publicMode={metaverseIsPublic}
                    cnElementWithLoading={cnMetaverseElementWithLoading}
                  />
                }
              </div>
              <div className={"ItemI"} onClick={updateMetaverseVisibility}>
                <div className={cnMetaverseElementWithLoading}>
                  <CoolCircle
                    profileIsPublic={profileIsPublic}
                    publicMode={metaverseIsPublic}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisibilitySelectors;
