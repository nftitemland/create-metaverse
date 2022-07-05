import axios from "axios";
import { getNTokenData } from "../utils/nToken";
import { API_BASE_URL } from "../constants";

const getRecentlyBattled = async ({ address }) => {
  try {
    const url = `${API_BASE_URL}/expansive-world/battle/recent`;

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
        "nftitem-ntoken": nTokenData?.nToken,
      },
      // data: {
      //   username: usernameInput,
      // },
    });

    const recentlyBattled = response.data.recentBattles;

    return recentlyBattled;
  } catch (err) {
    console.log("error in getting recently battled:", err);
    // throw err;
  }
};

export default getRecentlyBattled;
