import { useEffect, useState } from "react";
import loadTransactions from "../../../../../api/loadTransactions";
import { nftImages } from "../../../../../constants";
import doBattle from "../../../../../utils/doBattle";
// import { getPoiPoiImageUrl } from "../../../../../utils/getImageUrls";
import { getImageUrl } from "../../../../../utils/getImageUrl";
// import getRoundedNumber from "../../../../../utils/getRoundedNumber";

// const getHealthPercent = ({ hp, damage }) => {
//   const lifeRemaining = hp - damage;

//   const healthPercent = getRoundedNumber(lifeRemaining / hp);

//   return healthPercent;
// };

// const getHealthBarWidthClass = ({ healthPercent }) => {
//   if (healthPercent > 0.9) {
//     return "wA";
//   } else if (healthPercent > 0.8) {
//     return "wB";
//   } else if (healthPercent > 0.7) {
//     return "wC";
//   } else if (healthPercent > 0.6) {
//     return "wD";
//   } else if (healthPercent > 0.5) {
//     return "wE";
//   } else if (healthPercent > 0.4) {
//     return "wF";
//   } else if (healthPercent > 0.3) {
//     return "wG";
//   } else if (healthPercent > 0.2) {
//     return "wH";
//   } else if (healthPercent > 0.1) {
//     return "wI";
//   }
//   return "wJ";
// };

const CharacterElement = ({ imageUrl, hp, damage, right = false }) => {
  // const healthPercent = getHealthPercent({
  //   hp,
  //   damage,
  // });

  // const healthBarWidth = `${healthPercent * 100}%`;

  // const widthClass = getHealthBarWidthClass({
  //   healthPercent,
  // });

  return (
    <div
      style={{
        // marginTop: 40,
        width: "50%",
        maxWidth: 500,
        backgroundColor: "black",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        alt={"Battle Character"}
        style={{
          // width: "20%",
          width: "100%",
        }}
        src={imageUrl}
      />
      {/* <div
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "darkblue",
          display: "flex",
          flexDirection: "row",
          justifyContent: right ? "flex-end" : "flex-start",
          alignItems: "center",
        }}
      >
        <div
          // className={`HealthBar ${widthClass}`}
          style={{
            width: healthBarWidth,
            height: "90%",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        ></div>
      </div> */}
    </div>
  );
};

/*
"battleData": {
            "info": {
                "isFirst": true,
                "enemyUserId": "7a70c441-d18b-4095-b5d3-f2f8a12274fa",
                "battleValue": 5.2765749,
                "attack": 291.81481702,
                "hp": 875.44445105,
                "enemyHp": 52.76574895,
                "userCharacterData": {
                    "selectedCharacter": {
                        "type": "POIPOI",
                        "id": "30"
                    },
                    "characterLevel": 5
                },
                "enemyAttack": 17.58858298,
                "enemyUserCharacterData": {
                    "selectedCharacter": null,
                    "characterLevel": 0
                }
            },
            "turnData": {
                "damage": 0,
                "enemyDamage": 0,
                "turn": 0,
                "isUserTurn": false
            }
        },
        "lastBattleData": {
            "isWinner": true,
            "amount": 5.86286099
        }
    }
*/

// const getIsUserTurn = ({ battleData }) => {
//   const turnData = battleData.turnData;

//   if (turnData.isUserTurn) {
//     return false;
//   }

//   return true;
// };

const DEFAULT_IMAGE_URL = nftImages.DEFAULT_POI;
// const getPoiPoiImageUrl = (id) =>
//   `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_${id}.png`;

const getCharacterImageUrl = ({ userCharacterData }) => {
  const typeExists =
    typeof userCharacterData?.selectedCharacter?.type === "string";

  const idExists = ["string", "number"].includes(
    typeof userCharacterData?.selectedCharacter?.id
  );

  if (typeExists && idExists) {
    const id = userCharacterData.selectedCharacter.id;
    const type = userCharacterData.selectedCharacter.type;

    const imageUrl = getImageUrl({
      id,
      type,
    });

    if (imageUrl) {
      return imageUrl;
    }
    // switch (type) {
    //   case nftKeys.POIPOI:
    //     return getImageUrl({

    //       type: nftKeys
    //     });
    //   default:
    //     break;
    // }
  }

  return DEFAULT_IMAGE_URL;
};

const EnemyTurnSection = ({
  userData,
  address,
  setUserData,
  setIsLoading,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  setTransactionIdToTransactionPag,
  updateStatus,
  setRecentlyBattled,
}) => {
  const [enemyBattleTurnStarted, setEnemyBattleTurnStarted] = useState(false);

  useEffect(() => {
    if (!enemyBattleTurnStarted) {
      setEnemyBattleTurnStarted(true);

      new Promise(async () => {
        setIsLoading(true);

        // return;

        try {
          // await delay(1000);
          await doBattle({
            updateStatus,
            setRecentlyBattled,
            address,
            setUserData,
            enemyUserId: userData.battleData.info.enemyUserId,
            afterFunction: async () => {
              const response = await loadTransactions({
                address,
              });

              if (response.response) {
                const rawTxs = response.response.data.transactions;

                const txIdToTx = Object.assign({}, transactionIdToTransaction);

                for (const rawTx of rawTxs) {
                  txIdToTx[rawTx.id] = rawTx;
                }

                setTransactionIdToTransaction(txIdToTx);

                if (response.response.data.pag) {
                  setTransactionIdToTransactionPag(response.response.data.pag);
                }
              }
            },
          });

          setIsLoading(false);
        } catch (err) {
          console.log("error in battle:", err);
          setIsLoading(false);
        }
      }, []);
    }
  }, [
    setRecentlyBattled,
    enemyBattleTurnStarted,
    setIsLoading,
    setTransactionIdToTransaction,
    userData,
    address,
    setUserData,
    setTransactionIdToTransactionPag,
    transactionIdToTransaction,
    updateStatus,
  ]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CharacterElement
        hp={userData?.battleData?.info?.hp}
        damage={userData?.battleData?.turnData?.damage}
        imageUrl={getCharacterImageUrl({
          userCharacterData: userData?.battleData?.info?.userCharacterData,
        })}
      />
      <CharacterElement
        hp={userData?.battleData?.info?.enemyHp}
        damage={userData?.battleData?.turnData?.enemyDamage}
        imageUrl={getCharacterImageUrl({
          userCharacterData: userData?.battleData?.info?.enemyUserCharacterData,
        })}
        right={true}
      />
    </div>
  );
};

const FighterSection = ({
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
  // const isUserTurn = getIsUserTurn({
  //   battleData: userData.battleData,
  // });

  return (
    <div
      style={{
        // marginTop: 40,
        width: "100%",
        // height: 350,
        // backgroundColor: "blue",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // marginTop: 40,
          width: "100%",
          // backgroundColor: "blue",

          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isUserTurn ? (
          <div
            style={{
              // marginTop: 40,
              width: "100%",
              // backgroundColor: "blue",

              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CharacterElement
              hp={userData?.battleData?.info?.hp}
              damage={userData?.battleData?.turnData?.damage}
              imageUrl={getCharacterImageUrl({
                userCharacterData:
                  userData?.battleData?.info?.userCharacterData,
              })}
            />
            <CharacterElement
              hp={userData?.battleData?.info?.enemyHp}
              damage={userData?.battleData?.turnData?.enemyDamage}
              imageUrl={getCharacterImageUrl({
                userCharacterData:
                  userData?.battleData?.info?.enemyUserCharacterData,
              })}
              right={true}
            />
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#970000",

              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EnemyTurnSection
              userData={userData}
              address={address}
              setUserData={setUserData}
              setIsLoading={setIsLoading}
              transactionIdToTransaction={transactionIdToTransaction}
              setTransactionIdToTransaction={setTransactionIdToTransaction}
              setTransactionIdToTransactionPag={
                setTransactionIdToTransactionPag
              }
              updateStatus={updateStatus}
              setRecentlyBattled={setRecentlyBattled}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FighterSection;
