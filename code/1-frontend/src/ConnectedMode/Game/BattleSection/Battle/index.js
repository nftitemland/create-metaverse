// import doBattle from "./doBattle";
import BattleButtonSection from "./BattleButtonSection";
import FighterSection from "./FighterSection";
import HealthBarSection from "./HealthBartSection";

// import delay from "../../../../utils/delay";
// import InfiniteScroll  from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";

const getIsUserTurn = ({ battleData }) => {
  const turnData = battleData.turnData;

  if (turnData.isUserTurn) {
    return false;
  }

  return true;
};

const Battle = ({
  address,
  isLoading,
  setIsLoading,
  setUserData,
  userData,
  updateStatus,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  setTransactionIdToTransactionPag,
  setRecentlyBattled,
}) => {
  const isUserTurn = getIsUserTurn({
    battleData: userData.battleData,
  });

  return (
    <div
      style={{
        // marginTop: 40,
        // width: "100%",
        // height: "100%",
        // backgroundColor: "red",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FighterSection
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setUserData={setUserData}
        userData={userData}
        address={address}
        updateStatus={updateStatus}
        transactionIdToTransaction={transactionIdToTransaction}
        setTransactionIdToTransaction={setTransactionIdToTransaction}
        setTransactionIdToTransactionPag={setTransactionIdToTransactionPag}
        isUserTurn={isUserTurn}
        setRecentlyBattled={setRecentlyBattled}
      />
      <HealthBarSection userData={userData} />
      <BattleButtonSection
        updateStatus={updateStatus}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setUserData={setUserData}
        userData={userData}
        address={address}
        transactionIdToTransaction={transactionIdToTransaction}
        setTransactionIdToTransaction={setTransactionIdToTransaction}
        setTransactionIdToTransactionPag={setTransactionIdToTransactionPag}
        isUserTurn={isUserTurn}
        setRecentlyBattled={setRecentlyBattled}
      />
    </div>
  );
};

export default Battle;
