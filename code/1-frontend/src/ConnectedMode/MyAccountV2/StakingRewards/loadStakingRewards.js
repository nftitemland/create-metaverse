import axios from "axios";
import { API_BASE_URL } from "../../../constants";
import { getNTokenData } from "../../../utils/nToken";
import restart from "../../../utils/restart";

const safeLoadStakingRewards = async ({ url, address }) => {
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
    console.log("Error loading data s:", err);

    return {
      response: null,
      error: err,
    };
  }
};

const loadStakingRewardsCore = async ({ address, startTime, endTime }) => {
  const url =
    `${API_BASE_URL}/expansive-world` +
    `/staking-rewards?startTime=${startTime}&endTime=${endTime}`;

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
  const { response, error } = await safeLoadStakingRewards({
    url,
    address,
  });

  if (error) {
    console.log("ER:", error);

    restart();

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

  const gottenStakingRewards = response.data.stakingRewards;

  return gottenStakingRewards;
};

const loadStakingRewards = async ({ address, startTime, endTime }) => {
  try {
    const stakingRewardData = await loadStakingRewardsCore({
      address,
      startTime,
      endTime,
    });

    return stakingRewardData;
  } catch (err) {
    console.log("error in loading staking rewards data:", err);

    restart();

    return null;
  }
};

export default loadStakingRewards;
