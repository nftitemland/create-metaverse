import React, { useEffect } from "react";
import "./UserProfilesDisplayCase.css";
// import { API_BASE_URL } from "../../constants";
import refreshProfiles from "../../api/refreshProfiles";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";
// import delay from "../../utils/delay";
import Profile from "../Profile";

// import { ReactComponent as DiscordButtonAlt } from "./DiscordButtonAlt.svg";
// import { ReactComponent as OpenSeaButtonAlt } from "./OpenSeaButtonAlt.svg";
// import { ReactComponent as TwitterButtonAlt } from "./TwitterButtonAlt.svg";

function UserProfilesDisplayCase({
  marginTop,
  profiles,
  setProfiles,
  height,
  backgroundColor,
}) {
  // const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    new Promise(async (resolve, reject) => {
      await refreshProfiles({ setProfiles });
      resolve();
    });
  }, [setProfiles]);

  //{ windowWidth }
  //   const isMobileMode = windowWidth < 555;

  //   const { cnLowerZSectionBottomBar } = isMobileMode
  //     ? {
  //         cnLowerZSectionBottomBar: "LowerZSectionBottomBar Mobile",
  //         cnPreviousVersionButton: "PreviousVersionButton Mobile",
  //       }
  //     : {
  //         cnLowerZSectionBottomBar: "LowerZSectionBottomBar",
  //         cnPreviousVersionButton: "PreviousVersionButton",
  //       };

  const profileElements = profiles.map((profile, index) => {
    return (
      <Profile
        key={`${profile.username}-${index}`}
        username={profile.username}
        address={profile.address}
        artPoints={profile.artPoints}
      />
    );
  });

  return (
    <div
      className="UPDCMetaContainer"
      style={{
        height,
        backgroundColor,
      }}
    >
      <div
        className="UPDCMeta"
        style={{
          marginTop,
        }}
      >
        <div className="TitleMeta">
          <div className="TextMeta">
            <div className="Text">{"Top Profiles"}</div>
          </div>
        </div>
        <div className="ProfilesCaseMeta">
          <div className="ProfilesCase">{profileElements}</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilesDisplayCase;
