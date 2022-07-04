import { API_BASE_URL } from "../../../../../constants";
import { getNTokenData } from "../../../../../utils/nToken";
import axios from "axios";
// import React from "react";

// import getRoundedNumber from "../../../../../utils/getRoundedNumber";
// import { nftKeys } from "../../../../constants";

// import MyProfileManager from "../../MyAccountV2/MyProfileManager";
// import "./CharacterSection.css";
// import TxDisplaySection from "../../ExpansiveComponents/TxDisplaySection";

// import RealPoi from "./RealPoi";
// import BattleSection from "./BattleSection";
// import HeroineSection from "./HeroineSection";
// import PropertyDisplayer from "./PropertyDisplayer";
// import MyAccountV3 from "./MyAccountV3";
// import delay from "../../../../../utils/delay";

const doWithdraw = async ({ withdrawAddress, address, amount }) => {
  if (!address || !withdrawAddress || !amount) {
    console.log(`
        Missing Values: ${JSON.stringify(
          {
            address,
            withdrawAddress,
            amount,
          },
          null,
          4
        )}
    `);

    return;
  }

  const nTokenData = getNTokenData();

  // await delay(1000);
  await axios({
    method: "POST",
    url: `${API_BASE_URL}/expansive-world/withdraws`,
    headers: {
      "nftitem-address": address,
      "nftitem-ntoken": nTokenData?.nToken,
    },
    data: {
      withdrawAddress,
      amount,
    },
  });
};

export default doWithdraw;
