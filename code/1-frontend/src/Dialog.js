// import React, { useState, useEffect } from "react";
// import delay from "./utils/delay";
import { dialogModes } from "./constants";
import LowerMoreInfoSection from "./LowerMoreInfoSection";
// import GameMoreInfo from "./DialogComponents/GameMoreInfo";
import ProfileSettingsDialog from "./DialogComponents/ProfileSettingsDialog";
import NFTPreviewDialog from "./DialogComponents/NFTPreviewDialog";
import PixieJarsMintInfo from "./DialogComponents/PixieJarsMintInfo";
import RealpoiNews from "./DialogComponents/RealpoiNews";
import ReferralInfo from "./DialogComponents/ReferralInfo";
import TXS from "./DialogComponents/TXS";
// import LandsPreview from "./DialogComponents/LandsPreview";
import "./Dialog.css";

const getDialogData = ({
  dialogMode,
  windowWidth,
  windowHeight,
  closeDialog,
  userData,
  dialogModeImage,
  isLoading,
  address,
  setIsLoading,
  setUserData,
  setProfiles,
  userDataLandClaim,
  updateStatus,
  nftPreviewDialogData,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  transactionIdToTransactionPag,
  setTransactionIdToTransactionPag,
  existingDiscountCodeData,

  setAddress,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,
}) => {
  nftPreviewDialogData = Array.isArray(nftPreviewDialogData)
    ? nftPreviewDialogData
    : [nftPreviewDialogData];

  switch (dialogMode) {
    // case dialogModes.minigame.MINI_GAME_ONE_MORE_INFO:
    //   return {
    //     dialog: <GameMoreInfo />,
    //   };

    case dialogModes.FAQ:
      return {
        dialog: (
          <LowerMoreInfoSection windowWidth={windowWidth} modalMode={true} />
        ),
      };
    // case dialogModes.LANDS_PREVIEW:
    //   return {
    //     dialog: <LandsPreview userLandsData={userDataLandClaim?.landsData} />,
    //   };
    case dialogModes.PROFILE_SETTINGS:
      return {
        dialog: (
          <ProfileSettingsDialog
            updateStatus={updateStatus}
            userData={userData}
            isLoading={isLoading}
            address={address}
            setIsLoading={setIsLoading}
            setUserData={setUserData}
            setProfiles={setProfiles}
          />
        ),
      };

    case dialogModes.NFT_PREVIEW:
      return {
        dialog: (
          <NFTPreviewDialog
            nftPreviewDialogDataList={nftPreviewDialogData}
            windowWidth={windowWidth}
          />
        ),
      };
    case dialogModes.PIXIE_JARS_MINT_DATA:
      return {
        dialog: <PixieJarsMintInfo />,
      };

    case dialogModes.REALPOI_NEWS:
      return {
        dialog: <RealpoiNews />,
      };

    case dialogModes.REFERRAL_INFO:
      return {
        dialog: (
          <ReferralInfo
            address={address}
            windowHeight={windowHeight}
            existingDiscountCodeData={existingDiscountCodeData}
            updateStatus={updateStatus}
            setIsLoading={setIsLoading}
            setAddress={setAddress}
            setIsConnected={setIsConnected}
            setProvider={setProvider}
            setPermaNoMint={setPermaNoMint}
            setMetaMaskAddress={setMetaMaskAddress}
            // userId={userData.userId}
          />
        ),
      };

    case dialogModes.IMAGE:
      // const isMobileMode = windowWidth <= 570;
      // const isMobileMode = windowWidth <= 99999;

      // const dim = windowWidth < 700 ? 320 : "100%";

      return {
        dialog: (
          <div
            onClick={() => {
              closeDialog();
            }}
            style={{
              // backgroundColor: "pink",
              // width: "100%",
              width: "100%",
              // maxHeight: "100%",
              height: "100%",
              // minWidth: dim,
              // minHeight: dim,
              // height: "100%",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <img
              alt="NFT"
              src={dialogModeImage || ""}
              style={{
                position: "sticky",
                // position: "absolute",
                // top: -200÷,
                width: "100%",
                // minHeight: 200,
                // maxHeight: "100%",
                borderRadius: 15,
              }}
            ></img>
          </div>
        ),
      };

    case dialogModes.TXS:
      return {
        dialog: (
          <TXS
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setUserData={setUserData}
            address={address}
            transactionIdToTransaction={transactionIdToTransaction}
            setTransactionIdToTransaction={setTransactionIdToTransaction}
            pag={transactionIdToTransactionPag}
            setPag={setTransactionIdToTransactionPag}
          />
        ),
      };

    default:
      return {
        dialog: null,
      };
  }
};

const getRealDialogOuterMeta = ({ isImageMode, windowWidth, windowHeight }) => {
  if (!isImageMode) {
    return "RealDialogOuterMeta";
  }

  // const isObscureDimsMegaMobileMode = windowHeight < 500;

  // if (isObscureDimsMegaMobileMode) {
  //   return "RealDialogOuterMeta ImageMegaModeMobileObscureDims";
  // }

  // if (windowHeight < 640 && windowWidth > 640) {
  //   return "RealDialogOuterMeta ImageMegaModeMobileObscureDims";
  // }

  // const isMegaMobileMode = windowHeight < 99999;
  // if (isMegaMobileMode) {
  //   return "RealDialogOuterMeta ImageMegaModeMobile";
  // }

  return "RealDialogOuterMeta ImageModeMobile";

  // return "RealDialogOuterMeta ImageMode";
};

const getTop = ({ isHyperMobileMode, isImageMode }) => {
  if (isImageMode) {
    return "unset";
  }

  if (isHyperMobileMode) {
    return 0;
  }

  return undefined;
};

function Dialog({
  dialogMode,
  // updateDialogMode,
  windowHeight,
  closeDialog,
  windowWidth,
  dialogIsClosing,
  dialogModeImage,
  userData,
  isLoading,
  address,
  setIsLoading,
  setUserData,
  setProfiles,
  userDataLandClaim,
  updateStatus,
  nftPreviewDialogData,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  transactionIdToTransactionPag,
  setTransactionIdToTransactionPag,
  existingDiscountCodeData,

  setAddress,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,
}) {
  // const [marginTop, setMarginTop] = useState(75);

  // useEffect(() => {
  //   const intervalNumber = setInterval(() => {
  //     setMarginTop(document.documentElement.scrollTop + 75);
  //   }, [0]);

  //   return () => {
  //     clearInterval(intervalNumber);
  //   };
  // }, [marginTop]);

  const { dialog } = getDialogData({
    dialogMode,
    windowWidth,
    windowHeight,
    closeDialog,
    userData,
    dialogModeImage,
    isLoading,
    address,
    setIsLoading,
    setUserData,
    setProfiles,
    userDataLandClaim,
    nftPreviewDialogData,
    updateStatus,
    transactionIdToTransaction,
    setTransactionIdToTransaction,
    transactionIdToTransactionPag,
    setTransactionIdToTransactionPag,
    existingDiscountCodeData,

    setAddress,
    setIsConnected,
    setProvider,
    setPermaNoMint,
    setMetaMaskAddress,
  });
  if (!dialog) {
    return null;
  }

  const { cnRealDialogMeta } = dialogIsClosing
    ? {
        cnRealDialogMeta: "RealDialogMeta Close",
      }
    : {
        cnRealDialogMeta: "RealDialogMeta Open",
      };

  const isImageMode = dialogMode === dialogModes.IMAGE;

  const isHyperMobileMode = windowWidth <= 750 || windowHeight <= 700;

  const top = getTop({
    isHyperMobileMode,
    isImageMode,
  });

  // try on click close, see if only for outer
  return (
    <div
      className={getRealDialogOuterMeta({
        isImageMode,
        windowWidth,
        windowHeight,
      })}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        closeDialog();
      }}
    >
      <div
        className={cnRealDialogMeta}
        style={{
          // position: "absolute",
          top,
          // top: isImageMode ? "unset" : undefined,
          // top: isHyperMobileMode ? isImageMode ? "unset" : undefined,
        }}
        // style={{
        //   maxWidth: dialogMode === dialogModes.LANDS_PREVIEW ? 1500 : undefined,
        // }}
      >
        {!isImageMode && (
          <div className={"CloseMetaButtonBar"}>
            <div className={"CloseMetaButtonBarCore"}>
              <div
                className={"CloseMetaButton"}
                onClick={() => {
                  closeDialog();
                }}
              >
                <div className={"CloseMetaButtonText"}>{"x"}</div>
              </div>
            </div>
          </div>
        )}
        {dialog}
      </div>
    </div>
  );
}

export default Dialog;
