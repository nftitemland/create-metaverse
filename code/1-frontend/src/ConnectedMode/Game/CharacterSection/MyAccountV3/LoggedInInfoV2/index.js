import React from "react";
import "./LoggedInInfoV2.css";
import UsernameElement from "./UserNameElement";

const LoggedInInfoV2 = ({
  address,
  userData,
  setUserData,
  isLoading,
  setIsLoading,
  updateStatus,
}) => {
  return (
    <div className="LoggedInInfoV2">
      <div className="Container">
        <div className="ItemA">
          <div className="Element">
            <div className="Text">{"Address"}</div>
          </div>
        </div>
        <div className="ItemB">
          <div className="Element Alt">
            <div className="Text">{`${address.substring(
              0,
              4
            )}...${address.substring(address.length - 4)}`}</div>
          </div>
        </div>
        <div className="ItemC">
          <div className="Element">
            <div className="Text">{"Username"}</div>
            <div
              className="Text"
              style={{
                fontSize: 14,
                fontFamily: `"Tajawal", sans-serif`,
              }}
            >
              {`currently ${userData.public ? "public" : "private"} `}
            </div>
          </div>
        </div>
        <div className="ItemD">
          <div className="Element">
            <UsernameElement
              userData={userData}
              setUserData={setUserData}
              address={address}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              updateStatus={updateStatus}
            />
          </div>
        </div>
        <div className="ItemE">
          <div className="Element">
            <div className="Text">{"Pixie Crystals"}</div>
          </div>
        </div>
        <div className="ItemF">
          <div className="Element Alt">
            <div className="Text">{userData.artPoints || 0}</div>
          </div>
        </div>
        <div className="ItemG">
          <div className="Element">
            <div className="Text">{"Bonus Code"}</div>
          </div>
        </div>
        <div className="ItemH">
          <div className="Element Alt">
            <div className="Text">{userData.referralCode || "-"}</div>
          </div>
        </div>
        {/* <div className="ItemI">
          <div className="Element">
            <div className="Text">{"Discount Link"}</div>
          </div>
        </div> */}
        {/* <div className="ItemJ">
          <div className="Element Alt">
            <div className="Text">
              <div
                style={{
                  width: "90%",
                  wordBreak: "break-all",
                  fontSize: 16,
                  marginTop: 9,
                  marginBottom: 15,
                }}
              >
                {`nftitemland.com?discount=${userData.userId}`}
              </div>
            </div>
          </div>
        </div>
        <div className="ItemK">
          <div className="Element">
            <div className="Text">{"Referral Percentage"}</div>
          </div>
        </div>
        <div className="ItemL">
          <div className="Element Alt">
            <div className="Text">50%</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoggedInInfoV2;
