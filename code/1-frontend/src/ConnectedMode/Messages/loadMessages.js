// import React, { useEffect, useState } from "react";
// import { getNTokenData } from "../../utils/nToken";
import axios from "axios";
import "./Messages.css";
// import MessageSection from "./MessageSection";
import { API_BASE_URL } from "../../constants";
// import MetaMaskBox from "../../ConnectedMode/MyAccountV2/LoggedInInfoV2/MetaMaskBox";

const safeLoadMessages = async ({ url }) => {
  try {
    const response = await axios({
      method: "GET",
      url,
      // headers: {
      // "nftitem-address": address,
      // "nftitem-ntoken": nTokenData.nToken,
      // },
    });

    return {
      response,
      error: null,
    };
  } catch (err) {
    console.log("Error loading data m:", err);
    return {
      response: null,
      error: err,
    };
  }
};

const loadMessagesCore = async ({
  // address,
  messageIdToData,
  nextMessagesData,
  setMessageIdToData,
  setNextMessagesData,
  doNotSetNextMessagesData = false,
}) => {
  const baseUrl = `${API_BASE_URL}/expansive-world/messages`;
  const url =
    baseUrl +
    (!!nextMessagesData
      ? `?pag=${window.btoa(JSON.stringify(nextMessagesData))}`
      : "");

  // console.log(`

  //     REQ LOG: ${JSON.stringify(
  //       {
  //         nextMessagesData,
  //         method: "GET",
  //         url,
  //         headers: {
  //           "nftitem-address": address,
  //           "nftitem-ntoken": nTokenData.nToken,
  //         },
  //       },
  //       null,
  //       4
  //     )}

  // `);

  // const nTokenData = getNTokenData();
  const { response, error } = await safeLoadMessages({
    url,
    // },
  });

  if (error) {
    return;
  }
  // console.log(`

  //     RES LOG: ${JSON.stringify(
  //       {
  //         data: response.data,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  const gottenMessages = response.data.messages;

  const newMessageIdToData = Object.assign({}, messageIdToData);

  for (const message of gottenMessages) {
    // message ,time ,id

    newMessageIdToData[message.id] = message;
  }

  setMessageIdToData(newMessageIdToData);

  if (!doNotSetNextMessagesData) {
    if (response.data.pag) {
      setNextMessagesData(response.data.pag);
    } else {
      setNextMessagesData(null);
    }
  }
};

const loadMessages = async ({
  // address,
  messageIdToData,
  nextMessagesData,
  setMessageIdToData,
  setNextMessagesData,
  doNotSetNextMessagesData,
}) => {
  try {
    await loadMessagesCore({
      // address,
      messageIdToData,
      nextMessagesData,
      setMessageIdToData,
      setNextMessagesData,
      doNotSetNextMessagesData,
    });
  } catch (err) {
    console.log("error in loading data:", err);
  }
};

export default loadMessages;
