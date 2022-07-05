// import React, { useEffect, useState } from "react";
import { getNTokenData } from "../../utils/nToken";
import axios from "axios";
import "./Messages.css";
import loadMessages from "./loadMessages";
import { API_BASE_URL } from "../../constants";

const sendMessageCore = async ({
  address,
  message,
  messageIdToData,
  // nextMessagesData,
  setMessageIdToData,
  setNextMessagesData,
}) => {
  await axios({
    method: "POST",
    url: `${API_BASE_URL}/expansive-world/messages`,
    headers: {
      "nftitem-address": address,
      "nftitem-ntoken": getNTokenData().nToken,
    },
    data: {
      message,
    },
  });

  await loadMessages({
    address,
    messageIdToData,
    // nextMessagesData,
    setMessageIdToData,
    setNextMessagesData,
    doNotSetNextMessagesData: true,
  });
};

const sendMessage = async ({
  address,
  message,
  messageIdToData,
  // nextMessagesData,
  setMessageIdToData,
  setNextMessagesData,
}) => {
  try {
    await sendMessageCore({
      address,
      message,
      messageIdToData,
      // nextMessagesData,
      setMessageIdToData,
      setNextMessagesData,
    });
  } catch (err) {
    console.log("error in sending message:", err);
    throw err;
  }
};

export default sendMessage;
