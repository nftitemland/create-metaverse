// import doBattle from "./doBattle";
import loadTransactions from "../../../../api/loadTransactions";
import doBattle from "../../../../utils/doBattle";

// import delay from "../../../../utils/delay";
// import InfiniteScroll  from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";

const BattleButtonSection = ({
  address,
  isLoading,
  setIsLoading,
  setUserData,
  userData,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  setTransactionIdToTransactionPag,
  isUserTurn,
  updateStatus,
  setRecentlyBattled,
}) => {
  return (
    <div
      style={{
        // marginTop: 40,
        width: "100%",
        maxHeight: 55,
        height: "100%",
        backgroundColor: "rgb(7, 11, 34)",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // marginTop: 40,
          width: 200,
          // maxHeight: "20%",
          height: 55,
          backgroundColor: isUserTurn
            ? isLoading
              ? "darkgrey"
              : "blue"
            : "#970000",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          userSelect: "none",
          cursor: isUserTurn ? (isLoading ? "unset" : "pointer") : "unset",
        }}
        onClick={async () => {
          if (isLoading) {
            return;
          }

          setIsLoading(true);

          try {
            // await delay(1000);
            await doBattle({
              updateStatus,
              address,
              setUserData,
              enemyUserId: userData.battleData.info.enemyUserId,
              setRecentlyBattled,
              afterFunction: async () => {
                const response = await loadTransactions({
                  address,
                });

                if (response.response) {
                  const rawTxs = response.response.data.transactions;

                  const txIdToTx = Object.assign(
                    {},
                    transactionIdToTransaction
                  );

                  for (const rawTx of rawTxs) {
                    txIdToTx[rawTx.id] = rawTx;
                  }

                  setTransactionIdToTransaction(txIdToTx);

                  if (response.response.data.pag) {
                    setTransactionIdToTransactionPag(
                      response.response.data.pag
                    );
                  }
                }
              },
            });

            setIsLoading(false);
          } catch (err) {
            console.log("error in battle:", err);
            setIsLoading(false);
          }
        }}
      >
        <div
          style={{
            // marginTop: 40,
            // width: "100%",
            // maxHeight: "20%",
            //   height: 55,
            //   marginTop: 5,
            fontSize: 22,
            //   backgroundColor: "#970000",
            color: "white",

            textAlign: "center",
            fontFamily: `"Amaranth", sans-serif`,
            //   fontFamily: `"Tajawal", sans-serif`,
          }}
        >
          {isUserTurn ? "Strike" : "Opponent Strike"}
        </div>
      </div>
    </div>
  );
};

export default BattleButtonSection;
