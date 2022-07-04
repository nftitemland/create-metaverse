import "../MidFashionStyleBar.css";
import login from "../../ConnectedMode/MyAccountV2/login";

const height = 70;
const smallHeight = 50;
const smallMarginTopBottom = (height - smallHeight) / 2;

const LoginButton = ({
  permaNoMint,
  isLoading,
  setIsLoading,
  provider,
  address,
  setUserData,
  setPage,
  updateStatus,
  isMobileMode = false,
  resetStateLogin,
  smallMode = false,
}) => {
  // smallMode = false;
  return (
    <div
      // disabled={}
      className="ConnectToMetaMaskButton"
      style={{
        width: smallMode ? 200 : 280,
        height: smallMode ? smallHeight : height,
        marginTop: smallMode ? smallMarginTopBottom : 0,
        marginBottom: smallMode ? smallMarginTopBottom : 0,
        borderRadius: 6,
        // marginBottom: 20,
      }}
      onClick={async () => {
        const disabled = permaNoMint || isLoading;
        if (disabled) {
          return;
        }
        try {
          setIsLoading(true);

          // setMenuIsOpen(false);

          await login({
            provider,
            address,
            setUserData,
            setPage,
            resetStateLogin,
          });

          updateStatus("Login Successful", 2);

          // setPostLogin(true);

          setIsLoading(false);
        } catch (err) {
          console.log("error in logging in:", err);

          if (err?.message.toLowerCase().includes("user denied")) {
            updateStatus(`Login Cancelled`);
          } else {
            updateStatus(`Error in logging in: ${err.message}`);
          }

          setIsLoading(false);
        }
      }}
    >
      <div
        className="ConnectToMetaMaskButtonText"
        style={{
          fontSize: smallMode ? 18 : isMobileMode ? 20 : undefined,
        }}
      >
        {"Create Account or Login"}
      </div>
    </div>
  );
};

export default LoginButton;
