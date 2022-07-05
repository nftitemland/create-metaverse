// import React, { useEffect, useState } from "react";
import axios from "axios";
import { getNTokenData } from "../../../../utils/nToken";
// import { getNTokenData } from ];
import { API_BASE_URL } from "../../../../constants";
import restart from "../../../../utils/restart";
// import MessageSection from "./MessageSection";
// import MetaMaskBox from "../../ConnectedMode/MyAccountV2/LoggedInInfoV2/MetaMaskBox";

const loadWithdrawLevel = async ({ address }) => {
  const url = `${API_BASE_URL}/expansive-world/withdraw-level`;
  // const url = baseUrl + (!!pag ? `?pag=${window.btoa(pag)}` : "");

  const nTokenData = getNTokenData();

  if (!nTokenData) {
    return restart();
  }

  const response = await axios({
    method: "GET",
    url,
    headers: {
      "nftitem-address": address,
      "nftitem-ntoken": nTokenData.nToken,
    },
  });

  return response;
};

export default loadWithdrawLevel;
