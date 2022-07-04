import React from "react";
import "./LoggedInInfoV2.css";
import UsernameElement from "./UserNameElement";
// import MetaMaskBox from "./MetaMaskBox";

const LoggedInInfoV2 = ({
  address,
  userData,
  setUserData,
  permaNoMint,
  isLoading,
  isConnected,
  updateStatus,
  setAddress,
  setIsLoading,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  metaMaskAddress,
  setMetaMaskAddress,
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
        {/* <div className="ItemG">
          <div className="Element">
            <div className="Text">{"Metamask"}</div>
          </div>
        </div>
        <div className="ItemH">
          <div className="Element">
            <MetaMaskBox
              // address={address}
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
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoggedInInfoV2;
