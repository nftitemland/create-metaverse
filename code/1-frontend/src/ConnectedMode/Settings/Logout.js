import React from "react"; //, { useState }
import "./Logout.css";
import axios from "axios";
// import { dialogModes } from "../../constants";
// import LowerMoreInfoSection from "../../LowerMoreInfoSection";
import {
  //dialogModes,
  API_BASE_URL,
} from "../../constants";
import restart from "../../utils/restart";
import { getNTokenData } from "../../utils/nToken";
// import { ReactComponent as HighlightPoi } from "../../HighlightPoi.svg";
// import { ReactComponent as HighlightPoi } from "./Slime8Export2.svg";
// import MintPoiPoi from "../MintPoiPoi";

// import MediaBar from "./MediaBar";

function Logout({ address, isLoading, setIsLoading, width }) {
  const logoutButtonIsDisabled = isLoading;

  const nTokenDataExists = !!getNTokenData();

  return (
    <div
      className={"UpperMeta"}
      style={{
        width,
      }}
    >
      <div className={"Upper"}>
        <div className={"LogoutMeta"}>
          <div
            className={
              logoutButtonIsDisabled ? "LogoutButton Disabled" : "LogoutButton"
            }
            onClick={async () => {
              if (logoutButtonIsDisabled) {
                return;
              }
              try {
                setIsLoading(true);
                const nTokenData = getNTokenData();

                if (!nTokenData) {
                  restart();
                  return;
                }

                await axios({
                  method: "post",
                  url: `${API_BASE_URL}/expansive-world/logout`,
                  headers: {
                    "nftitem-address": address,
                    "nftitem-ntoken": nTokenData.nToken,
                  },
                });

                restart();

                window.scrollTo({
                  top: 0,
                  // behavior: "smooth",
                });

                // setIsLoading(false);

                // TODO: update snackbar
              } catch (err) {
                console.log("error in signout:", err);
                setIsLoading(false);
                // TODO: update snackbar
              }
            }}
          >
            <div className={"Label"}>
              {nTokenDataExists ? "Logout" : "Disconnect Metamask"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
