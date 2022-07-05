// import { useEffect } from "react";
import { useState, useEffect } from "react";
// import TitleSectionCenter from "../ExpansiveComponents/TitleSectionCenter";

const triangleWidth = 39;
const triangleWidth2 = triangleWidth / 2;

const LeftButton = ({ nftIndex, setNftIndex, nftPreviewDialogDataList }) => {
  return (
    <div
      style={{
        // marginLeft
        // width: 50,
        // height: 50,
        // height: "100%",
        // backgroundColor: "rgb(7, 11, 34)",
        // backgroundColor: "pink",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: `${triangleWidth2}px ${triangleWidth}px ${triangleWidth2}px 0`,
        borderColor: "transparent #007bff transparent transparent",
      }}
      onClick={() => {
        let newNftItemIndex = (nftIndex - 1) % nftPreviewDialogDataList.length;

        if (newNftItemIndex < 0) {
          newNftItemIndex += nftPreviewDialogDataList.length;
        }

        setNftIndex(newNftItemIndex);
      }}
    ></div>
  );
};

const RightButton = ({ nftIndex, setNftIndex, nftPreviewDialogDataList }) => {
  return (
    <div
      style={{
        // width: 50,
        // height: 50,
        // height: "100%",
        // backgroundColor: "rgb(7, 11, 34)",
        // backgroundColor: "pink",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: `${triangleWidth2}px 0 ${triangleWidth2}px ${triangleWidth}px`,
        borderColor: "transparent transparent transparent #007bff",
      }}
      onClick={() => {
        const newNftItemIndex =
          (nftIndex + 1) % nftPreviewDialogDataList.length;

        setNftIndex(newNftItemIndex);
      }}
    ></div>
  );
};

const NFTPreviewDialog = ({ nftPreviewDialogDataList = [], windowWidth }) => {
  const [nftIndex, setNftIndex] = useState(0);

  useEffect(() => {
    return () => {
      setNftIndex(0);
    };
  }, []);

  const isMobileMode = windowWidth <= 600;

  if (!nftPreviewDialogDataList) {
    return null;
  }

  const nftPreviewDialogData = nftPreviewDialogDataList[nftIndex];

  if (!nftPreviewDialogData) {
    return null;
  }

  const thereAreMultipleNfts = nftPreviewDialogDataList.length > 1;

  return (
    <div
      style={{
        width: "100%",
        // height: 320,
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          // width: 270,
          // height: 260,
          height: 50,
          // backgroundColor: "blue",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // userSelect: "none",
          // cursor: "pointer",
        }}
      >
        <div
          style={{
            // width: 270,
            // height: 260,
            // height: 50,
            // backgroundColor: "blue",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // userSelect: "none",
            // cursor: "pointer",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontFamily: `"Tajawal", sans-serif`,
              fontSize: 18,
              color: "white",
              // marginTop: 18,
              // marginBottom: 14,
            }}
          >
            {nftPreviewDialogData.name}
          </div>
        </div>
        {nftPreviewDialogData.note && (
          <div
            style={{
              // width: 270,
              // height: 260,
              // height: 50,
              // backgroundColor: "blue",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // userSelect: "none",
              // cursor: "pointer",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontFamily: `"Tajawal", sans-serif`,
                fontSize: 14,
                color: "white",
                // marginTop: 18,
                // marginBottom: 14,
              }}
            >
              {nftPreviewDialogData.note}
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(7, 11, 34)",
          // backgroundColor: "blue",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginTop: 26,
            marginBottom: 26,
            minWidth: isMobileMode ? 180 : 260,
            minHeight: isMobileMode ? 180 : 260,
            // minWidth: 260,
            // minHeight: 260,
            width: "70%",
            // minHeight: "60%",
            // height: "1vh",

            backgroundColor: "black",
            // backgroundColor: "blue",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="NoDragElement"
            src={nftPreviewDialogData.image}
            // "https://deelay.me/2000/https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/nftitemdoll.jpeg"
            alt="NFT"
            style={{
              width: "100%",
              height: "100%",
              // borderRadius: 15,
            }}
          />
        </div>

        {isMobileMode ? (
          <div
            style={{
              width: "100%",
              marginBottom: 19,
              // height: "100%",
              // backgroundColor: "rgb(7, 11, 34)",
              // backgroundColor: "blue",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <div
            style={{
              marginLeft: 5,
              width: 50,
              height: 50,
              // height: "100%",
              // backgroundColor: "rgb(7, 11, 34)",
              backgroundColor: "pink",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          ></div> */}

            {thereAreMultipleNfts && (
              <div
                style={{
                  width: "100%",
                  marginBottom: 19,
                  // height: "100%",
                  // backgroundColor: "rgb(7, 11, 34)",
                  // backgroundColor: "blue",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <LeftButton
                  nftIndex={nftIndex}
                  setNftIndex={setNftIndex}
                  nftPreviewDialogDataList={nftPreviewDialogDataList}
                />
                <RightButton
                  nftIndex={nftIndex}
                  setNftIndex={setNftIndex}
                  nftPreviewDialogDataList={nftPreviewDialogDataList}
                />
              </div>
            )}

            <a
              href={nftPreviewDialogData.link}
              target={"_blank"}
              rel="noreferrer"
            >
              <div
                style={{
                  width: 270,
                  // height: 260,
                  backgroundColor: "black",
                  height: 50,
                  // backgroundColor: "blue",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  userSelect: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontFamily: `"Tajawal", sans-serif`,
                    fontSize: 20,
                    color: "white",
                    marginTop: 18,
                    marginBottom: 14,
                  }}
                >
                  {"View Collection on OpenSea"}
                </div>
              </div>
            </a>
          </div>
        ) : (
          <div
            style={{
              width: "93%",
              marginBottom: 19,
              // height: "100%",
              // backgroundColor: "rgb(7, 11, 34)",
              // backgroundColor: "blue",
              display: "flex",
              flexDirection: "row",
              justifyContent: thereAreMultipleNfts ? "space-between" : "center",
              alignItems: "center",
            }}
          >
            {/* <div
            style={{
              marginLeft: 5,
              width: 50,
              height: 50,
              // height: "100%",
              // backgroundColor: "rgb(7, 11, 34)",
              backgroundColor: "pink",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          ></div> */}

            {thereAreMultipleNfts && (
              <LeftButton
                nftIndex={nftIndex}
                setNftIndex={setNftIndex}
                nftPreviewDialogDataList={nftPreviewDialogDataList}
              />
            )}

            <a
              href={nftPreviewDialogData.link}
              target={"_blank"}
              rel="noreferrer"
            >
              <div
                style={{
                  width: 270,
                  // height: 260,
                  backgroundColor: "black",
                  height: 50,
                  // backgroundColor: "blue",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  userSelect: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontFamily: `"Tajawal", sans-serif`,
                    fontSize: 20,
                    color: "white",
                    marginTop: 18,
                    marginBottom: 14,
                  }}
                >
                  {"View Collection on OpenSea"}
                </div>
              </div>
            </a>

            {thereAreMultipleNfts && (
              <RightButton
                nftIndex={nftIndex}
                setNftIndex={setNftIndex}
                nftPreviewDialogDataList={nftPreviewDialogDataList}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTPreviewDialog;
