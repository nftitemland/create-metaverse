// import { NULL_USER_ID } from "../constants";

import { NULL_ADDRESS } from "../constants";
import connectMetaMask from "../MidFashionStyleBar/ConnectButton/init";

const SCROLL_BOX_HEIGHT = 500;
const CONTAINER_BOX_MAX_HEIGHT = 600;

const ConnectButton = ({
  address,
  updateStatus,
  setAddress,
  setIsLoading,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,
}) => {
  if (address !== NULL_ADDRESS) {
    return (
      <div
        // className="Text"
        style={{
          color: "white",
          marginTop: 20,
          marginBottom: 15,
          fontFamily: `"Tajawal", sans-serif`,
          width: "90%",
        }}
      >
        {"loading..."}
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: 10,
        marginBottom: 5,
        // marginTop: 35,
        // backgroundColor: "beige",
        // backgroundColor: "beige",
        width: 200,
        // height: 100,

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <button
        style={{
          width: "90%",
          // height: 30,
          borderRadius: 4,
          paddingTop: 10,
          paddingBottom: 10,
          // backgroundColor: isLoading ? "#2a2c39" : "black",
          backgroundColor: "black",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: '"Amaranth", sans-serif',
          cursor: "pointer",
        }}
        // disabled={isLoading}
        onClick={() => {
          connectMetaMask({
            setStatus: updateStatus,
            setAddress,
            setIsLoading,
            setIsConnected,
            setProvider,
            setPermaNoMint,
            setMetaMaskAddress,
          });
        }}
      >
        {"Connect MetaMask"}
      </button>
    </div>
  );
};

const ReferralInfo = ({
  windowHeight,
  existingDiscountCodeData,
  address,

  updateStatus,
  setAddress,
  setIsLoading,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,
}) => {
  const isLoggedIn =
    existingDiscountCodeData && existingDiscountCodeData.userId;

  return (
    <div
      style={{
        maxHeight: CONTAINER_BOX_MAX_HEIGHT,
        height: windowHeight,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "darkblue",
        backgroundColor: "darkblue",
        fontFamily: `"Amaranth", sans-serif`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        overflow: "scroll",
      }}
    >
      <div
        className="TopMeta"
        style={{
          width: "100%",
          backgroundColor: "black",
        }}
      >
        <div
          className="TitleMeta"
          style={{
            color: "white",
            marginTop: 20,
            marginBottom: 20,
            fontSize: 18,
          }}
        >
          <div className="Text">{"Discount Code And Referrals"}</div>
        </div>

        {/* <div
          className="Text"
          style={{
            width: "94%",
            marginTop: 3,
            marginBottom: 2,
            fontSize: 16,
            // width: "100%",
            fontFamily: `"Tajawal", sans-serif`,
            color: "white",
          }}
        >
          Updated April 29th 2022
        </div>

        <img
          alt="World"
          style={{
            width: "80%",
          }}
          src={
            "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/realpoi_world_2_background.png"
          }
        ></img> */}
      </div>

      <div>
        <div
          style={{
            width: "100%",
            height: SCROLL_BOX_HEIGHT,
            // overflow: "scroll",
            backgroundColor: "darkblue",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div
            // className="Text"
            style={{
              color: "white",
              marginTop: 20,
              marginBottom: 15,
              fontFamily: `"Tajawal", sans-serif`,
              width: "90%",
            }}
          >
            <b>Discount Code</b>
            <br />
            Activating a discount code will give you a refund after minting an
            NFT. The refund amount is a percentage of the original minting
            amount.
            <br />
            <br />
            You will receive your refund in MATIC within 1-3 days after minting.
            <br />
            <br />
            <b>Referrals</b>
            <br />
            Discount link referrers get 15% or more of the minting amount, after
            discount. You will receive your referral percentage in MATIC within
            1-3 days after minting.
            <br />
            <br />
            <br />
            <b>My Referral Link</b>
            <br />
            {isLoggedIn ? (
              `www.nftitemland.com/discount/${existingDiscountCodeData.userId}`
            ) : (
              <ConnectButton
                address={address}
                updateStatus={updateStatus}
                setAddress={setAddress}
                setIsLoading={setIsLoading}
                setIsConnected={setIsConnected}
                setProvider={setProvider}
                setPermaNoMint={setPermaNoMint}
                setMetaMaskAddress={setMetaMaskAddress}
              />
            )}
            <br />
            <br />
            <br />
            <b>My Earnings Percentage</b>
            <br />
            {isLoggedIn ? (
              `${existingDiscountCodeData?.earningsPercentageData?.percentage}%`
            ) : (
              <ConnectButton
                address={address}
                updateStatus={updateStatus}
                setAddress={setAddress}
                setIsLoading={setIsLoading}
                setIsConnected={setIsConnected}
                setProvider={setProvider}
                setPermaNoMint={setPermaNoMint}
                setMetaMaskAddress={setMetaMaskAddress}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
/*
MEGA LOG: {
  "existingDiscountCodeData": {
      "poiPassTechnical": "ppt_al3434tpwdbub",
      "referralCode": "e47c5a69-bba5-4611-82cb-c0a8a7d477fd",
      "earningsPercentageData": {
          "name": "Giga Earn",
          "percentage": 80
      }
  }*/
// Your discount link and your earnings percentage are both
//specified in your "Profile" section on the "Game" page.
export default ReferralInfo;
