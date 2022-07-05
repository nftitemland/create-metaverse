// import React, { useEffect, useState } from "react";
import axios from "axios";
import { getNTokenData } from "../utils/nToken";
import { API_BASE_URL } from "../constants";
// import MessageSection from "./MessageSection";
// import MetaMaskBox from "../../ConnectedMode/MyAccountV2/LoggedInInfoV2/MetaMaskBox";

const loadTransactions = async ({ address, pag }) => {
  try {
    const baseUrl = `${API_BASE_URL}/expansive-world/transactions`;
    const url = baseUrl + (!!pag ? `?pag=${window.btoa(pag)}` : "");

    const nTokenData = getNTokenData();

    if (!nTokenData) {
      return {
        response: null,
        error: new Error("transactions error, not connected"),
      };
    }

    const response = await axios({
      method: "GET",
      url,
      headers: {
        "nftitem-address": address,
        "nftitem-ntoken": nTokenData.nToken,
      },
    });

    return {
      response,
      error: null,
    };
  } catch (err) {
    console.log("Error loading transactions:", err);
    return {
      response: null,
      error: err,
    };
  }
};

export default loadTransactions;
