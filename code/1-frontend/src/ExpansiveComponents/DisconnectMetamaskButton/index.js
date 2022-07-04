import restart from "../../utils/restart";

const DisconnectMetaMaskButton = ({ isLoading }) => {
  return (
    <div
      style={{
        width: 80,
        // height: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: isLoading ? "rgb(1 5 32)" : "rgb(7, 11, 34)",
          // height: 60,
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          // marginLeft: "50%",
        }}
        onClick={() => {
          if (!isLoading) {
            restart();
            return;
          }
        }}
      >
        <div
          style={{
            width: "90%",
            textAlign: "center",
            fontFamily: `"Amaranth", sans-serif`,
            fontSize: 13,
            color: "white",
            marginTop: 5,
            marginBottom: 5,
            userSelect: "none",
          }}
        >
          {"Disconnect MetaMask"}
        </div>
      </div>
    </div>
  );
};

export default DisconnectMetaMaskButton;
