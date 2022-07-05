import React from "react"; //  useState, useEffect
import "./Profile.css";
// import { API_BASE_URL } from "../../constants";
// import delay from "../../utils/delay";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";

// import { ReactComponent as DiscordButtonAlt } from "./DiscordButtonAlt.svg";
// import { ReactComponent as OpenSeaButtonAlt } from "./OpenSeaButtonAlt.svg";
// import { ReactComponent as TwitterButtonAlt } from "./TwitterButtonAlt.svg";

const Profile = ({ artPoints, address, username }) => {
  const secondLifeSectionElements = [];

  if (typeof artPoints === "number" && !Number.isNaN(artPoints)) {
    secondLifeSectionElements.push(
      <div key="ArtPointsMeta" className="ArtPointsMeta">
        <div className="Text">{`Pixie Crystals: ${artPoints}`}</div>
      </div>
    );
  }

  if (!!address && typeof address === "string") {
    secondLifeSectionElements.push(
      <div key="AddressMeta" className="AddressMeta">
        <div className="Text">{`Address: ${address}`}</div>
      </div>
    );
  }

  return (
    <div className={"PublicProfile"}>
      <div className="TitleMeta">
        <div className="TitleTextMeta">
          <div className="TitleText">{username}</div>
        </div>
      </div>
      <div className="SecondLifeSection">{secondLifeSectionElements}</div>
    </div>
  );
};

export default Profile;
