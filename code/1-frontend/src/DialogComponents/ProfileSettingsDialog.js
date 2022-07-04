import MyProfileManager from "../ConnectedMode/MyAccountV2/MyProfileManager";

const ProfileSettingsDialog = ({
  updateStatus,
  userData,
  isLoading,
  address,
  setIsLoading,
  setUserData,
  setProfiles,
}) => {
  return (
    <div
      // className="DialogComponent"
      style={{
        width: "100%",
        // minWidth: 320,
        backgroundColor: "#353a53",
        paddingBottom: 15,
        borderRadius: 8,
      }}
    >
      <MyProfileManager
        updateStatus={updateStatus}
        userData={userData}
        isLoading={isLoading}
        address={address}
        setIsLoading={setIsLoading}
        setUserData={setUserData}
        setProfiles={setProfiles}
        displayPreviewMyProfile={false}
        displaySelectUsernameVisibility={false}
        displaySelectAddressVisibility={false}
        displaySelectArtPointsVisibility={false}
        displayMetaverseText={true}
        displayBattleModeSelector={false}
        displaySelectGamePoiMetaverseVisibility={true}
        display
        width={290}
      />
    </div>
  );
};

export default ProfileSettingsDialog;
