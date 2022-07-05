const ultraFlaminContractAddress = "0xea508034fcc8eeff24bf43effe42621008359a2e";

const hexEncode = function (stringValue) {
  const hex = Number(stringValue).toString(16);

  return `0x${hex}`;
};

const BASE_HEX_FLAMINGO_COUNT_PARAM_STRING =
  "a0712d680000000000000000000000000000000000000000000000000000000000000000";

const getWantedFlamingoCount = (price) => {
  const hexFlamingos = price.toString(16);

  const wantedFlamingoCount =
    BASE_HEX_FLAMINGO_COUNT_PARAM_STRING.substring(
      0,
      BASE_HEX_FLAMINGO_COUNT_PARAM_STRING.length - hexFlamingos.length
    ) + hexFlamingos;

  return wantedFlamingoCount;
};

const mintFlamingo = async ({
  setIsLoading,
  address,
  provider,
  updateStatus,
  wantedFlamingoCount,
}) => {
  if (provider.chainId !== "0x1") {
    updateStatus(
      "MetaMask is not set to the Polygon network. " +
        "Please switch your MetaMask network to the Polygon Mainnet network."
    );

    console.log(`incorrect chainId: ${provider.chainId}`);

    return;
  }

  setIsLoading(true);
  try {
    const price = wantedFlamingoCount * 0.03;
    let amount = String(price * 1000000000000000000);

    const params = [
      {
        from: address,
        to: ultraFlaminContractAddress,
        value: hexEncode(Number(amount)),
        data: getWantedFlamingoCount(wantedFlamingoCount),
      },
    ];

    const transactionId = await provider.request({
      method: "eth_sendTransaction",
      params,
    });

    updateStatus(
      <span>
        {`Poi mint requested. Polygon transaction ID: `}
        <span className="StatusBoxTransactionId">{transactionId}</span>
      </span>
    );
  } catch (err) {
    console.log("Minting Error:", err);

    const errorMessage = err.message.toLowerCase().includes("user denied")
      ? "Cancelled Mint"
      : err.message;

    updateStatus(`Pixie not minted: ${errorMessage}`);
  }

  setIsLoading(false);
};

export default mintFlamingo;
