import React from "react";
import "./MyAccountV2.css";
import LoggedInInfoV2 from "./LoggedInInfoV2";

function MyAccountV3({
  address,
  isLoading,
  setIsLoading,
  userData,
  setUserData,
  updateStatus,
}) {
  // const [postLogin, setPostLogin] = useState(false);
  return (
    <div className="MyAccountMetaV2">
      <div className="MyAccountV2">
        <div className="TopSection">
          <div className="LeftPart LoggedIn">
            <div className="TextMeta">
              <div className="Text LoggedIn">{"User Data"}</div>
            </div>
          </div>
        </div>
        <div className="SectionTwo">
          <LoggedInInfoV2
            address={address}
            userData={userData}
            setUserData={setUserData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            updateStatus={updateStatus}
          />
        </div>
      </div>
    </div>
  );
}

export default MyAccountV3;
