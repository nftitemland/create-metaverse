import axios from "axios";
import { API_BASE_URL } from "../constants";
import { getNTokenData } from "./nToken";
import refreshUserData from "../api/refreshUserData";
// import InfiniteScroll from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";

const doBattle = async ({
  address,
  setUserData,
  enemyUserId,
  updateStatus,
  afterFunction,
  setRecentlyBattled = async () => {},
}) => {
  if (!address || !enemyUserId) {
    console.log("unexpected issue, missing address/enemy user id");
    return;
  }

  const nTokenData = getNTokenData();

  const response = await axios({
    method: "POST",
    url: `${API_BASE_URL}/expansive-world/battle-v2`,
    headers: {
      "nftitem-address": address,
      "nftitem-ntoken": nTokenData.nToken,
    },
    // miniGameState: "END",
    data: {
      enemyUserId: enemyUserId, // 185
    },
  });

  // if (response.data.lastBattleData) {
  //   // if (victoryData) {
  //   //   const isWinner = victoryData.winnerAddress === address;

  //   //   responseValues.lastBattleData = {
  //   //     isWinner,
  //   //     amount: isWinner ? victoryData.winAmount : victoryData.loseAmount,
  //   //   };
  //   // }

  const winAmount = response.data.amount;

  const won = winAmount >= 0;

  updateStatus(
    // `Date finished, gained ${response.data.lastBattleData.amount} ` +
    //   "Pixie Crystals"
    `${won > 0 ? "Won" : "Lost"} Battle: ${winAmount} Pixie Crystals`
  );

  // }

  const doUserRefresh = async () => {
    await refreshUserData({
      address,
      nToken: nTokenData.nToken,
      setUserData,
      // landClaimMode: true,
    });
  };

  const doBattleRefresh = async () => {
    afterFunction();
    await doUserRefresh();
  };

  await Promise.all([doBattleRefresh(), await setRecentlyBattled({ address })]);

  setTimeout(async () => {
    await doBattleRefresh();
  }, 5500);

  // setTimeout(async () => {
  //   await doBattleRefresh();
  // }, 8000);

  // setTimeout(async () => {
  //   await doBattleRefresh();
  // }, 12000);
};

export default doBattle;
