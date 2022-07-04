// import "./App.css";
// import { useState } from "react";
// import delay from "./utils/delay";

const MODE = process.env.REACT_APP_MODE;
const PRODUCTION = "production";

const isProductionMode = MODE === PRODUCTION;

const nftItemContractOwnerAddress = isProductionMode
  ? "0x9aAbad90B9ae12355580B7aCEBc3449E5F54B948"
  : "0xc9b5AC437A8887F2Eaf40455345928E39e681C3F";

// 35000000000000000
// const mintPrice = "0x7c585087238000";

const desiredChainId = isProductionMode ? "0x1" : "0x4";

const mintSlime = async ({
  setIsLoading,
  address,
  provider,
  setStatus,
  mintPrice,
}) => {
  if (provider.chainId !== desiredChainId) {
    // setStatus(
    //   "MetaMask is not set to the right Ethereum network. " +
    //     "Please switch your MetaMask network to the mainnet Ethereum network."
    // );

    setStatus(
      "MetaMask is not set to the Ethereum network. " +
        "Please switch your MetaMask network to the Ethereum Mainnet network."
    );

    console.log(`incorrect chainId: ${provider.chainId}`);

    return;
  }

  setIsLoading(true);
  try {
    const params = [
      {
        from: address,
        to: nftItemContractOwnerAddress,
        value: mintPrice,
        // gas: "0x76c0", // 30400
        // gasPrice: "0x9184e72a000", // 10000000000000
        // value: hexEncode(mintPrice), // 2441406250
        // data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
      },
    ];

    const transactionId = await provider.request({
      method: "eth_sendTransaction",
      params,
    });
    // console.log("mint results:", results);

    setStatus(
      <span>
        {`PoiPoi successfully minted. Ethereum transaction ID: `}
        <span className="StatusBoxTransactionId">{transactionId}</span>
      </span>
    );
  } catch (err) {
    console.log("Minting Error:", err);

    const errorMessage = err.message.toLowerCase().includes("user denied")
      ? "Cancelled Mint"
      : err.message;

    setStatus(`PoiPoi not minted: ${errorMessage}`);
  }

  setIsLoading(false);
};

export default mintSlime;
