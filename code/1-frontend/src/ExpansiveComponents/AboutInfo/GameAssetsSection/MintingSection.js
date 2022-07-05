import { chainToCurrencyUnit, poipoiTypes } from "../../../constants";
import getRoundedNumber from "../../../utils/getRoundedNumber";
import mintItem from "./mintItem";
import altMint from "./altMint";
import ConnectButton from "../../../MidFashionStyleBar/ConnectButton";

const getText = ({ gameAssetsDatum, mintAmount, rarityText, totalPrice }) => {
  if (gameAssetsDatum.customMadeRequestOnly) {
    return "By Request Only";
  }

  let title;

  if (mintAmount > 1) {
    if (gameAssetsDatum.title === "Hunny") {
      title = "Hunnies";
    } else {
      title = `${gameAssetsDatum.title}s`;
    }
  } else {
    title = gameAssetsDatum.title;
  }

  // const title = `${gameAssetsDatum.title}${mintAmount > 1 ? "s" : ""}`;

  return gameAssetsDatum.customMadeRequestOnly
    ? "By Request Only"
    : `Mint ${mintAmount} ${rarityText} ${title} for ${totalPrice} ${
        chainToCurrencyUnit[gameAssetsDatum.chain]
      }`;
};

const MintAmountSelectSection = ({
  isMobileMode,
  gameAssetsDatum,
  isPoiPoiMode,
}) => {
  let contents = null;
  let backgroundColor;

  if (
    gameAssetsDatum.setMintAmount &&
    typeof gameAssetsDatum.mintAmount === "string"
  ) {
    contents = (
      <>
        <input
          type={"number"}
          style={{
            width: "100%",
            height: "100%",
            fontFamily: `"Tajawal", sans-serif`,
            color: "white",
            backgroundColor: "rgb(18, 34, 158)",

            textAlign: "center",
            fontSize: 18,
            border: "none",
            paddingTop: 9.5,
          }}
          onInput={(e) => {
            const newText = e.target.value;

            if (newText.includes(".") || newText.length > 3) {
              return;
            } else if (newText.startsWith("00")) {
              gameAssetsDatum.setMintAmount("0");
              return;
            } else if (newText.startsWith("0") && newText.length > 1) {
              gameAssetsDatum.setMintAmount(newText.substring(1));
              return;
            }
            const newTextAsNumber = Number(newText);

            if (!Number.isNaN(newTextAsNumber) && newTextAsNumber < 0) {
              gameAssetsDatum.setMintAmount("0");
              return;
            }

            gameAssetsDatum.setMintAmount(newText);
          }}
          value={gameAssetsDatum.mintAmount}
        />
      </>
    );
    backgroundColor = "black";

    return (
      <div
        style={{
          // marginTop: 20,
          backgroundColor: backgroundColor,
          width: 70,
          height: 70,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {contents}
      </div>
    );
  } else if (isPoiPoiMode) {
    contents = (
      <>
        <select
          style={{
            height: 70,
            width: 70,
            fontFamily: `"Tajawal", sans-serif`,
            backgroundColor: "rgb(18, 34, 158)",
            color: "white",
            fontSize: 16,
          }}
          onChange={(e) => {
            gameAssetsDatum.setMintSectionSelectedPoiPoiType(e.target.value);
          }}
          // value={gameAssetsDatum.mintSectionSelectedPoiPoiType}
          value={gameAssetsDatum.mintSectionSelectedPoiPoiType}
        >
          <option value={poipoiTypes.HYPER_RARE}>Hyper</option>
          <option value={poipoiTypes.GIGA_RARE}>Giga</option>
        </select>
      </>
    );
    backgroundColor = "black";

    return (
      <div
        style={{
          // marginTop: 20,
          backgroundColor: backgroundColor,
          width: 70,
          height: 70,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {contents}
      </div>
    );
  }

  return null;
};

const SECTION_HEIGHT = 100;

const MintingSection = ({
  isMobileMode,
  gameAssetsDatum,
  //
  setIsLoading,
  address,
  provider,
  updateStatus,

  permaNoMint,
  isLoading,
  isConnected,
  setAddress,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,

  //   aboutInfoGameAssetsPage,
  //   aboutInfoGameAssetsLandMintAmount,
  //   setAboutInfoGameAssetsLandMintAmount,
  //   aboutInfoGameAssetsPoiMintAmount,
  //   setAboutInfoGameAssetsPoiMintAmount,
}) => {
  if (gameAssetsDatum.currentServerOutage) {
    return (
      <div
        style={{
          // marginTop: 20,
          backgroundColor: "darkgray",
          width: 200,
          height: 70,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <div
          style={{
            color: "black",
            fontFamily: `"Amaranth", sans-serif`,
            textAlign: "center",
            width: "92%",
            fontSize: 16,
          }}
        >
          {`PoiPoi Store Temporarily Closed For Updates, Re-Opening Soon (March 6)`}
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div
        style={{
          // marginTop: 20,
          // backgroundColor: "beige",
          width: "100%",
          height: SECTION_HEIGHT,

          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // marginTop: 20,
            // backgroundColor: "black",
            // width: isMobileMode ? 120 : 252,
            // height: 70,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ConnectButton
            // setStatus={setStatus}
            // address={address}
            // provider={provider}

            // loginButtonMode={!userData}

            // provider={provider}
            // address={address}
            // setUserData={setUserData}
            // setPage={setPage}

            permaNoMint={permaNoMint}
            isLoading={isLoading}
            isConnected={isConnected}
            updateStatus={updateStatus}
            setAddress={setAddress}
            setIsLoading={setIsLoading}
            setIsConnected={setIsConnected}
            setProvider={setProvider}
            setPermaNoMint={setPermaNoMint}
            setMetaMaskAddress={setMetaMaskAddress}
            mobileMode={isMobileMode}
          />
        </div>
      </div>
    );
  }

  const mintAmount =
    gameAssetsDatum.mintAmount && gameAssetsDatum.mintAmount !== "0"
      ? gameAssetsDatum.mintAmount
      : 1;

  const isPoiPoi = gameAssetsDatum.title === "PoiPoi";

  const totalPrice = getRoundedNumber(
    mintAmount * gameAssetsDatum.price +
      (isPoiPoi &&
      gameAssetsDatum.mintSectionSelectedPoiPoiType === poipoiTypes.GIGA_RARE
        ? 0.06
        : 0)
  );

  const rarityText = isPoiPoi
    ? `${
        gameAssetsDatum.mintSectionSelectedPoiPoiType === poipoiTypes.GIGA_RARE
          ? "Giga-Rare"
          : "Hyper-Rare"
      } `
    : "";

  return (
    <div
      style={{
        // marginTop: 20,
        // backgroundColor: "beige",
        // backgroundColor: "rgb(18, 34, 158)",
        width: "100%",
        height: SECTION_HEIGHT,

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // marginTop: 20,
          // backgroundColor: "beige",
          // backgroundColor: "rgb(18, 34, 158)",
          width: "100%",
          // height: SECTION_HEIGHT,

          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // marginTop: 20,
            backgroundColor: "rgb(18, 34, 158)",
            width: isMobileMode ? (gameAssetsDatum.altMint ? 160 : 120) : 240,
            height: 70,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
            cursor: gameAssetsDatum.customMadeRequestOnly ? "unset" : "pointer",
          }}
          onClick={async () => {
            if (gameAssetsDatum.customMadeRequestOnly) {
              return;
            }
            if (gameAssetsDatum.altMint) {
              try {
                await altMint({
                  setIsLoading,
                  address,
                  provider,
                  setStatus: updateStatus,
                  mintPrice: totalPrice,
                });
              } catch (err) {
                console.log("error in mint:", err);
              }
              return;
            }

            const wantedFlamingoCount = Number(mintAmount);

            if (
              !wantedFlamingoCount ||
              Number.isNaN(wantedFlamingoCount) ||
              wantedFlamingoCount > gameAssetsDatum.maxMintAmount
            ) {
              return;
            }

            try {
              await mintItem({
                setIsLoading,
                address,
                provider,
                updateStatus,
                wantedFlamingoCount,
                contractAddress: gameAssetsDatum.contractAddress,
                price: gameAssetsDatum.price,
              });
            } catch (err) {
              console.log("error in mint:", err);
            }
          }}
        >
          <div
            style={{
              color: "white",
              fontFamily: `"Amaranth", sans-serif`,
              textAlign: "center",
              width: "92%",
              fontSize: isMobileMode ? 16 : "unset",
            }}
          >
            {getText({
              gameAssetsDatum,
              mintAmount,
              rarityText,
              totalPrice,
            })}
          </div>
        </div>
        <div
          style={{
            width: 5,
            height: 5,
          }}
        ></div>
        <MintAmountSelectSection
          gameAssetsDatum={gameAssetsDatum}
          isPoiPoiMode={gameAssetsDatum.title === "PoiPoi"}
        />
      </div>
    </div>
  );
};

export default MintingSection;
