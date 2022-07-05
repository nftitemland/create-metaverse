import React from "react";
import "./MetaMaskBox.css";
import init from "../../../../../MidFashionStyleBar/ConnectButton/init";
// import { API_BASE_URL } from "../../../constants";
// import { getNTokenData } from "../../../utils/nToken";

// {/* <div className="Text">{`nftitem.net/${username}`}</div> */}

// const allowedUsernameCharacters = "abcdefghijklmnopqrstuvwxyz1234567890_";

const MetamaskBox = ({
  // address = "",
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
  // const [editMode, setEditMode] = useState(false);
  // const [usernameInput, setUsernameInput] = useState("");

  // const { username } = userData;

  const connectButtonDisabled = permaNoMint || isLoading || isConnected;

  return (
    <div className="MetaMaskBox">
      {isConnected ? (
        <div className={"ConnectedModeMeta"}>
          <div className={"Left"}>
            <div className={"TextMeta"}>
              <div className={"Text"}>{"Connected"}</div>
              <div className={"SmallGreenCircle"} />
            </div>
          </div>
          <div className={"Right"}>
            <div className={"TextMeta"}>
              <div className={"Text"}>{`${metaMaskAddress.substring(
                0,
                4
              )}...${metaMaskAddress.substring(
                metaMaskAddress.length - 4
              )}`}</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            connectButtonDisabled ? "ConnectButton Disabled" : "ConnectButton"
          }
          onClick={async () => {
            if (connectButtonDisabled) {
              return;
            }
            try {
              const { failMessage } = await init({
                setStatus: updateStatus,
                setAddress,
                setIsLoading,
                setIsConnected,
                setProvider,
                setPermaNoMint,
                setMetaMaskAddress,
              });

              if (!!failMessage) {
                return updateStatus(failMessage);
              }
            } catch (err) {
              console.log("error in MetaMask initialization:", err.message);
              updateStatus("Failed setting up MetaMask");
            }
          }}
        >
          <div className="Label">{"Connect"}</div>
        </div>
      )}
    </div>
  );
};

export default MetamaskBox;
