import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import { API_BASE_URL } from "../../constants";
// import refreshProfiles from "../../api/refreshProfiles";
// import delay from "../../utils/delay";
// import Profile from "../BattleProfile";
import loadTransactions from "../../api/loadTransactions";

function TxDisplaySection({
  marginTop = 0,
  // profiles,
  // setProfiles,
  height = "unset",
  backgroundColor = "rgb(7, 11, 34)",

  // setIsLoading,
  // isLoading,
  // setUserData,
  address,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  pag,
  setPag,
}) {
  const [firstLoadHasStarted, setFirstLoadHasStarted] = useState(false);
  // const [pag, setPag] = useState(null);
  // const [transactionIdToTransaction, setTransactionIdToTransaction] = useState(
  //   {}
  // );

  useEffect(() => {
    if (Object.keys(transactionIdToTransaction).length > 0) {
      setFirstLoadHasStarted(true);
      return;
    }

    if (!firstLoadHasStarted) {
      setFirstLoadHasStarted(true);

      new Promise(async (resolve) => {
        const response = await loadTransactions({
          address,
        });

        if (response.response) {
          const rawTxs = response.response.data.transactions;

          const txIdToTx = {};

          for (const rawTx of rawTxs) {
            txIdToTx[rawTx.id] = rawTx;
          }

          setTransactionIdToTransaction(txIdToTx);

          if (response.response.data.pag) {
            setPag(response.response.data.pag);
          }
        }

        resolve();
      });
    }
  }, [
    firstLoadHasStarted,
    address,
    setPag,
    transactionIdToTransaction,
    setTransactionIdToTransaction,
  ]);

  const txData = [];

  for (const id in transactionIdToTransaction) {
    const transaction = transactionIdToTransaction[id];

    txData.push(transaction);
  }

  txData.sort((a, b) => {
    return b.time - a.time;
  });

  const txElements = txData.map(({ data, time }, outerIndex) => {
    const dataElements = data.map((datum, index) => {
      return (
        <div
          key={`${datum.key}${datum.value}${index}`}
          style={{
            backgroundColor: "#070b22",
            width: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: `"Tajawal", sans-serif`,
              width: "96%",
              color: "white",
              textAlign: "left",
            }}
          >{`${datum.key}: ${datum.value}`}</div>
        </div>
      );
    });

    return (
      <div
        key={`dataX${outerIndex}`}
        style={{
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: "#070b22",
          width: "100%",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#070b22",
            width: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: `"Tajawal", sans-serif`,
              width: "96%",
              textAlign: "left",
              color: "white",
            }}
          >{`Time: ${new Date(time).toLocaleString()}`}</div>
        </div>
        {dataElements}
      </div>
    );
  });

  return (
    <div
      style={{
        height,
        backgroundColor,

        width: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop,
          width: "100%",
          maxWidth: "740px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            // backgroundColor: "rgb(7, 11, 34)",
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              marginLeft: "7px",
              marginBottom: "7px",
            }}
          >
            <div
              style={{
                fontFamily: `"Amaranth", sans-serif`,
                textAlign: "center",
                fontSize: "24px",
                color: "white",
              }}
            >
              {"Diary"}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            // height: 250,
            // backgroundColor: "#4d536e",
            backgroundColor: "black",
            overflowY: "scroll",
          }}
        >
          <InfiniteScroll
            scrollableTarget={"MessageTrack"}
            dataLength={txElements.length}
            next={async () => {
              const response = await loadTransactions({
                address,
                pag,
              });

              if (response.response) {
                const rawTxs = response.response.data.transactions;

                const txIdToTx = Object.assign({}, transactionIdToTransaction);

                for (const rawTx of rawTxs) {
                  txIdToTx[rawTx.id] = rawTx;
                }

                setTransactionIdToTransaction(txIdToTx);

                if (response.response.data.pag) {
                  setPag(response.response.data.pag);
                }
              }
            }}
            // inverse={true}
            // style={{ display: "flex", flexDirection: "column-reverse" }}
            hasMore={!!pag}
            loader={
              <h4
                style={{
                  fontFamily: `"Tajawal", sans-serif`,
                  marginLeft: 20,
                }}
              >
                ...
              </h4>
            }
            height={300}
            style={{
              width: "100%",
              // backgroundColor: "black",
              // overflowY: "hidden",
            }}
            initialScrollY={0}
            endMessage={
              <p
                style={{
                  textAlign: "center",
                  fontFamily: `"Tajawal", sans-serif`,
                }}
              >
                <b>- - -</b>
              </p>
            }
          >
            {txElements}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default TxDisplaySection;
