import React from "react";
import TitleSection from "../TitleSection";

const infoData = [
  {
    titleText: "The Pixie NFT Metaverse",
    infoText: (
      <>
        NFT Item is a new metaverse platform focused on building NFT communities
        and providing NFT utility including staking and gaming. The NFT Item
        metaverse loves Pixies, that's why it's called The Pixieverse!
      </>
    ),
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJNFTItemland.jpeg",
  },
  {
    titleText: "NFT Staking and DeFi",
    infoText: (
      <>
        Select NFT holders can connect to MetaMask then login to automatically
        start staking Pixie Crystals. Pixie Crystals will be used as in-game
        metaverse currency and will be able to be withdrawn to your MetaMask.
      </>
    ),
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJ3.png",
  },
  {
    titleText: "NFT Gaming Fun!",
    infoText: (
      <>
        The Pixieverse is an NFT-based metaverse where you get part ownership of
        the metaverse by holding land NFTs.
        {/* Stay tuned for details about an
        upcoming NFT land claim airdrop event on February 12th! */}
      </>
    ),
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJnftitem.png",
  },
];

// const infoDataIndex = 0;

const ModeSelectButton = ({
  setCurrentInfoPage,
  currentInfoPage,
  infoPage,
  label,
}) => {
  const pageIsSelected = currentInfoPage === infoPage;
  return (
    <div
      style={{
        backgroundColor: pageIsSelected ? "beige" : "rgb(7, 11, 34)",
        width: 100,
        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        setCurrentInfoPage(infoPage);
      }}
    >
      <div
        style={{
          fontSize: 20,
          width: "100%",
          marginTop: 4,

          textAlign: "center",
          fontFamily: `"Tajawal", sans-serif`,
          userSelect: "none",
          color: pageIsSelected ? "black" : "white",
        }}
      >
        {label}
      </div>
    </div>
  );
};

const AboutInfo = ({
  windowWidth,
  setImageDialog,
  currentInfoPage,
  setCurrentInfoPage,
}) => {
  const isMobileMode = windowWidth <= 700;

  const infoDatum = infoData[currentInfoPage] || {};

  return (
    <div
      style={{
        marginTop: 20,
        // backgroundColor: "rgb(18, 34, 158)",
        width: "100%",
        // height: 300,

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <TitleSection
        titleText="Metaverse Storefront"
        height={60}
        width={"100%"}
        backgroundColor="rgb(7, 11, 34)"
      />
      <div
        style={{
          //   marginTop: 20,
          //   backgroundColor: "pink",
          width: "100%",
          height: "100%",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            //   marginTop: 20,
            backgroundColor: "black",
            width: "100%",
            height: isMobileMode ? 400 : 300,

            display: "flex",
            flexDirection: isMobileMode ? "column-reverse" : "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              //   marginTop: 20,
              //   backgroundColor: "darkblue",
              width: 280,
              height: 160,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                //   marginTop: 20,
                // backgroundColor: "darkblue",

                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  //   backgroundColor: "beige",
                  width: "95%",
                  height: 25,

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    width: "100%",
                    // marginTop: 4,
                    // fontFamily: `"Tajawal", sans-serif`,
                    color: "white",

                    fontFamily: `"Amaranth", sans-serif`,
                  }}
                >
                  {infoDatum.titleText}
                </div>
              </div>

              <div
                style={{
                  //   marginTop: 20,
                  //   backgroundColor: "black",
                  width: "96%",
                  // height: "100%",

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",

                  alignItems: "center",

                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    width: "100%",
                    marginTop: 4,
                    color: "white",
                    fontFamily: `"Tajawal", sans-serif`,
                  }}
                >
                  {infoDatum.infoText}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              //   marginTop: 20,
              backgroundColor: "darkblue",
              width: isMobileMode ? 200 : 250,
              height: isMobileMode ? 200 : 250,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              onClick={() => {
                setImageDialog(infoDatum.image);
              }}
              style={{
                width: "100%",
                userSelect: "none",
              }}
              alt={"NFT Item Pixieverse info"}
              src={infoDatum.image}
            ></img>
          </div>
        </div>

        <div
          style={{
            //   marginTop: 20,
            // backgroundColor: "peru",
            width: "100%",
            height: 60,

            marginTop: 9,
            marginBottom: 12,

            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModeSelectButton
            label={"Metaverse"}
            infoPage={0}
            currentInfoPage={currentInfoPage}
            setCurrentInfoPage={setCurrentInfoPage}
          />
          <div
            style={{
              width: 2,
              height: 2,
            }}
          />
          <ModeSelectButton
            label={"Staking"}
            infoPage={1}
            currentInfoPage={currentInfoPage}
            setCurrentInfoPage={setCurrentInfoPage}
          />
          <div
            style={{
              width: 4,
              height: 2,
            }}
          />
          <ModeSelectButton
            label={"Gaming"}
            infoPage={2}
            currentInfoPage={currentInfoPage}
            setCurrentInfoPage={setCurrentInfoPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
