import axios from "axios";

import { API_BASE_URL, pages } from "../../constants";
import { storeNTokenData } from "../../utils/nToken";
import { setCurrentPage } from "../../utils/pageManager";
import refreshUserData from "../../api/refreshUserData";

//
const loginTokenLabels = {
  NFT_ITEM_LOGIN_TOKEN_V2: "NFT_ITEM_LOGIN_TOKEN_V2",
};

const EXPIRY_TIME = 1000 * 30;

export const getLoginTokenV2 = (address) => {
  const thePowerOfNow = Date.now();
  const expiry = thePowerOfNow + EXPIRY_TIME;
  return (
    `${loginTokenLabels.NFT_ITEM_LOGIN_TOKEN_V2}-` +
    `a-${address}-` +
    `t-${thePowerOfNow}-` +
    `e-${expiry}`
  );
};

const login = async ({ provider, address, setUserData, setPage }) => {
  const loginToken = getLoginTokenV2(address);

  const msgParams = JSON.stringify({
    domain: {},
    message: {
      contents: loginToken,
    },
    primaryType: "LoginToken",
    types: {
      LoginToken: [{ name: "contents", type: "string" }],
    },
  });

  const from = address;

  const params = [from, msgParams];
  const method = "eth_signTypedData_v4";

  try {
    const sendAsyncResults = await new Promise((resolve, reject) => {
      provider.sendAsync(
        {
          method,
          params,
          from,
        },
        function (err, result) {
          if (err) {
            return reject(err);
          }
          if (result.error) {
            console.log("ERROR", result, result.error.message);
            return reject(result.error);
          }

          resolve(result);
        }
      );
    });

    const loginResults = await axios({
      method: "post",
      url: `${API_BASE_URL}/expansive-world/login`,
      headers: {
        "nftitem-address": address,
        "nftitem-web3-signature": sendAsyncResults.result,
        "nftitem-login-token": loginToken,
      },
    });

    storeNTokenData({
      address,
      nToken: loginResults.data.nToken,
      expiry: loginResults.data.expiry,
    });

    // TODO: refresh user data
    // setUserData({
    //   username: "",
    // });
    setPage(pages.GAME);
    setCurrentPage(pages.GAME);
    refreshUserData({
      address,
      nToken: loginResults.data.nToken,
      setUserData,
    });
  } catch (err) {
    console.log("error in signing data:", err);
    throw err;
  }
};

export default login;

/*
{
    "jsonrpc": "2.0",
    "result": "0x34a80f68570a1915578e9b1387afbee62dba68e48a2238521062586451d138153a73e20a4497136019167fbc7b92b656f58a67e9a38c74cab0d554e39712d3721c"
}

*/
