import axios from "axios";
// import React, { useState } from "react";
import { API_BASE_URL } from "../../../constants";
// import RealPoi from "../../../ExpansiveComponents/RealPoi";
// import { getNTokenData } from "../../../utils/nToken";

// import MessagesMain from "./MessagesMain";
// import "./PreMessages.css";

const connectAsGuest = async ({ setGrecaptchaToken, updateStatus }) => {
  // const nTokenData = getNTokenData();

  try {
    // throw new Error("OEGMA");

    await axios({
      method: "POST",
      url: `${API_BASE_URL}/expansive-world/yguest/preconnect`,
      headers: {
        // "nftitem-address": address,
        // "nftitem-ntoken": nTokenData?.nToken,
      },
      data: {
        //   username: usernameInput,
      },
    });
  } catch (err) {
    const errorMessage =
      err?.response?.data?.message || err.message || "error in connecting";

    updateStatus(errorMessage, 6);

    const theErr = new Error(errorMessage);

    throw theErr;
  }

  window.grecaptcha.ready(function () {
    window.grecaptcha
      .execute(process.env.REACT_APP_GRECAPTCHA_KEY, {
        action: "submit",
      })
      .then(function (token) {
        // console.log(`

        //     MEGA LOG: ${JSON.stringify(
        //       {
        //         token,
        //       },
        //       null,
        //       4
        //     )}

        // `);

        setGrecaptchaToken(token);

        // Add your logic to submit to your backend server here.
      });
  });
};

export default connectAsGuest;
