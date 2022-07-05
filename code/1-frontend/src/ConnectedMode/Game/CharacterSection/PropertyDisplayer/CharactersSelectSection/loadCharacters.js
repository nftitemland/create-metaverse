// import React, { useEffect, useState } from "react";
import { getNTokenData } from "../../../../../utils/nToken";
import axios from "axios";
// import MessageSection from "./MessageSection";
import { API_BASE_URL, nftKeys } from "../../../../../constants";
import restart from "../../../../../utils/restart";
// import MetaMaskBox from "../../ConnectedMode/MyAccountV2/LoggedInInfoV2/MetaMaskBox";

const safeLoadCharacters = async ({ url, address }) => {
  try {
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

    return {
      response,
      error: null,
    };
  } catch (err) {
    console.log("Error loading data c:", err);
    return {
      response: null,
      error: err,
    };
  }
};

const loadCharactersCore = async ({ address, pag, mode }) => {
  const baseUrl = `${API_BASE_URL}/expansive-world/characters`;

  // const url = baseUrl + (!!pag ? `?pag=${pag}` : "?");

  const theMode = mode || nftKeys.POIPOI;

  const urlA = baseUrl + `?mode=${theMode}`;

  const url = urlA + (!!pag ? `&pag=${pag}` : "");

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
  const { response, error } = await safeLoadCharacters({
    address,
    url,

    // },
  });

  if (error) {
    return {
      characters: [],
      pag: null,
    };
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

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         response: response.data,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  return {
    characters: response.data.characters,
    pag: response.data.pag,
  };
};

const loadCharacters = async ({ address, pag, mode }) => {
  try {
    return await loadCharactersCore({
      address,
      pag,
      mode,
    });
  } catch (err) {
    console.log("error in loading data:", err);
    return {
      characters: [],
      pag: null,
    };
  }
};

export default loadCharacters;
