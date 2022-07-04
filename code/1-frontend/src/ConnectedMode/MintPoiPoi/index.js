import React from "react";
import "./MintPoiPoi.css";
import mintSlime from "./mintSlime";
import { dialogModes } from "../../constants";
import MetaMaskBox from "../../ConnectedMode/MyAccountV2/LoggedInInfoV2/MetaMaskBox";
import hexEncode from "../../utils/hexEncodeNumberString";

const poiPoiMintingRateData = {
  HYPER_RARE_PRICE: {
    key: "GIGA_RARE_PRICE",
    humanEthPrice: "0.035",
    mintPrice: "0x7c585087238000",
  },

  GIGA_RARE_PRICE: {
    key: "GIGA_RARE_PRICE",
    humanEthPrice: "0.0888",
    mintPrice: "0x13b7b21280e0000",
  },

  STANDARD_RARE_PRICE: {
    key: "STANDARD_RARE_PRICE",
    humanEthPrice: "0.07",
    mintPrice: hexEncode(0.07 * 1000000000000000000),
  },
};

const CoreMintingSection = ({
  isConnected,
  buttonsDisabled,
  isLoading,
  setMenuIsOpen,
  setIsLoading,
  provider,
  address,
  setStatus,
  updateDialogMode,
  mode2,
}) => {
  if (2 === 1) {
    return (
      <div className="ServiceDownMeta">
        <div className="TitleMeta2">
          <div className="Title">{"Minting Not Available"}</div>
        </div>
        <div className="InfoMeta">
          <div className="Info">
            {"PoiPoi currently not available for minting. " +
              "Please try again later."}
          </div>
        </div>
      </div>
    );
  }

  if (isConnected || mode2) {
    return (
      <div className="MintPoiPoi">
        <div className="ButtonHolder">
          <div
            className={
              buttonsDisabled || !isConnected
                ? "MintButton Disabled"
                : "MintButton"
            }
            // disabled={isLoading || !isConnected}
            onClick={async () => {
              if (!isConnected) {
                setStatus("Metamask connection is required", 2);
                return;
              }

              if (isLoading) {
                return;
              }
              setMenuIsOpen(false);
              await mintSlime({
                setIsLoading,
                provider,
                address,
                setStatus,
                mintPrice: poiPoiMintingRateData.STANDARD_RARE_PRICE.mintPrice,
              });
            }}
          >
            <div className="MintButtonText">
              {`Mint PoiPoi:`}
              <br />
              {`${poiPoiMintingRateData.STANDARD_RARE_PRICE.humanEthPrice} ETH`}
            </div>
          </div>
          {/* <div
            className={
              buttonsDisabled || !isConnected
                ? "MintButton Disabled"
                : "MintButton"
            }
            // disabled={isLoading || !isConnected}
            onClick={async () => {
              if (!isConnected) {
                setStatus("Metamask connection is required", 2);
                return;
              }

              if (isLoading) {
                return;
              }
              setMenuIsOpen(false);
              await mintSlime({
                setIsLoading,
                provider,
                address,
                setStatus,
                mintPrice: poiPoiMintingRateData.GIGA_RARE_PRICE.mintPrice,
              });
            }}
          >
            <div className="MintButtonText">
              {`Mint Giga-Rare PoiPoi:`}
              <br />
              {`${poiPoiMintingRateData.GIGA_RARE_PRICE.humanEthPrice} ETH`}
            </div>
          </div>
          <div
            className={
              buttonsDisabled || !isConnected
                ? "MintButton Disabled"
                : "MintButton"
            }
            // disabled={isLoading || !isConnected}
            onClick={async () => {
              if (!isConnected) {
                setStatus("Metamask connection is required", 2);
                return;
              }

              if (isLoading) {
                return;
              }
              setMenuIsOpen(false);
              await mintSlime({
                setIsLoading,
                provider,
                address,
                setStatus,
                mintPrice: poiPoiMintingRateData.HYPER_RARE_PRICE.mintPrice,
              });
            }}
          >
            <div className="MintButtonText">
              {`Mint Hyper-Rare PoiPoi:`}
              <br />
              {`${poiPoiMintingRateData.HYPER_RARE_PRICE.humanEthPrice} ETH`}
            </div>
          </div> */}
        </div>
        {!mode2 && (
          <div className="FAQButtonMeta">
            <div
              className={buttonsDisabled ? "FAQButton Disabled" : "FAQButton"}
              onClick={() => {
                if (isLoading) {
                  return;
                }
                updateDialogMode(dialogModes.FAQ);
              }}
            >
              <div className="FAQButtonText">{"F.A.Q."}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

function MintPoiPoi({
  isLoading,
  setIsLoading,
  isConnected,
  provider,
  address,
  setStatus,
  updateDialogMode,
  setMenuIsOpen,
  permaNoMint,
  updateStatus,
  setAddress,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  metaMaskAddress,
  setMetaMaskAddress,
  mode2,
}) {
  const buttonsDisabled = isLoading;

  return (
    <div className="MintPoiPoiMeta">
      <div className="PreMintPoiPoi">
        <div className="TitleMeta">
          <div className="TitleTextBox">
            <div className="TitleText">{"MetaMask"}</div>
          </div>
        </div>
        <MetaMaskBox
          permaNoMint={permaNoMint}
          isLoading={isLoading}
          isConnected={isConnected}
          updateStatus={updateStatus}
          setAddress={setAddress}
          setIsLoading={setIsLoading}
          setIsConnected={setIsConnected}
          setProvider={setProvider}
          setPermaNoMint={setPermaNoMint}
          metaMaskAddress={metaMaskAddress}
          setMetaMaskAddress={setMetaMaskAddress}
        />
        <CoreMintingSection
          isConnected={isConnected}
          buttonsDisabled={buttonsDisabled}
          isLoading={isLoading}
          setMenuIsOpen={setMenuIsOpen}
          setIsLoading={setIsLoading}
          provider={provider}
          address={address}
          setStatus={setStatus}
          updateDialogMode={updateDialogMode}
          mode2={mode2}
        />
      </div>
    </div>
  );
}

export default MintPoiPoi;
