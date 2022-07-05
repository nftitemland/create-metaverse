import React from "react";
import "./MyAccountV2.css";
// import UserProfilesDisplayCase from "../../ExpansiveComponents/UserProfilesDisplayCase";
// import MiniMap2 from "../../ExpansiveComponents/MiniMap2";
// import LoggedInInfoV2 from "./LoggedInInfoV2";
// import login from "./login";
// import MyProfileManager from "./MyProfileManager";
import StakingRewards from "./StakingRewards";
// import LandPromoSection from "./LandPromoSection";
import FlamingoLand from "./FlamingoLand";
// import MiniGameOne from "./MiniGameOne";
// import Logout from "../Settings/Logout";

// const gameEndTime = 1638334800000;

function MyAccountV2({
  setPage,
  address,
  updateStatus,
  isLoading,
  provider,
  setIsLoading,
  userData,
  setUserData,
  permaNoMint,
  isConnected,
  setAddress,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  metaMaskAddress,
  setMetaMaskAddress,
  updateDialogMode,
  profiles,
  setProfiles,
  setMenuIsOpen,
  userDataLandClaim,
  setUserDataLandClaim,
}) {
  // const [postLogin, setPostLogin] = useState(false);

  return (
    <div className="MyAccountMetaV2">
      {!!userData && false && (
        <FlamingoLand
          updateDialogMode={updateDialogMode}
          address={address}
          setUserData={setUserData}
          userDataLandClaim={userDataLandClaim}
          setUserDataLandClaim={setUserDataLandClaim}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          updateStatus={updateStatus}
        />
      )}
      {!!userData && <StakingRewards address={address} userData={userData} />}
      {/* {!!userData && (
        <LandPromoSection
          updateDialogMode={updateDialogMode}
          address={address}
          setUserData={setUserData}
          userDataLandClaim={userDataLandClaim}
          setUserDataLandClaim={setUserDataLandClaim}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          updateStatus={updateStatus}
        />
      )} */}
    </div>
  );
}

export default MyAccountV2;
