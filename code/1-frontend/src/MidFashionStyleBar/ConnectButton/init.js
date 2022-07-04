import detectEthereumProvider from "@metamask/detect-provider";
import delay from "../../utils/delay";
import { getNTokenData } from "../../utils/nToken";
// import delay from "../../utils/delay";

// const provider = await detectEthereumProvider();

// if (provider) {
//   // From now on, this should always be true:
//   // provider === window.ethereum
//   startApp(provider); // initialize your app
// } else {
//   console.log("Please install MetaMask!");
// }
const STAGING = "staging";
const PRODUCTION = "production";

const MODE = process.env.REACT_APP_MODE;

if (![STAGING, PRODUCTION].includes(MODE)) {
  throw new Error("invalid mode:", MODE);
}

const ensureChainIdIsCorrect = async ({
  provider,
  iterationCount = 0,
  setStatus,
}) => {
  iterationCount++;

  if (iterationCount > 6) {
    throw new Error("unable to detect chainId");
  } else if (!provider.chainId) {
    await delay(1000);
    return await ensureChainIdIsCorrect({
      provider,
      iterationCount,
      setStatus,
    });
  }
};

let loadProviderHasBeenTriggered = false;

const loadProvider = async ({
  setStatus,
  setAddress,
  setPermaNoMint,
  setMetaMaskAddress,
}) => {
  const provider = await detectEthereumProvider();

  if (!!provider) {
    console.log("ETH Provider exists");

    try {
      provider.on("chainChanged", (chainId) => {
        console.log("chainChanged:", chainId);
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });

      provider.on("accountsChanged", () => {
        if (loadProviderHasBeenTriggered) {
          window.location.reload();
        } else {
          loadProviderHasBeenTriggered = true;
        }
      });

      await ensureChainIdIsCorrect({ provider, setStatus });

      if (typeof provider.isConnected !== "function") {
        throw new Error("Unable to connect with MetaMask.");
      }

      const isNotConnected = !provider.isConnected();

      if (isNotConnected) {
        throw new Error("MetaMask is not connected to the Ethereum network.");
      }

      const functionStorage = {
        address: null,
      };

      try {
        const addresses = await provider.request({
          method: "eth_requestAccounts",
        });

        console.log("metamask results:", addresses);

        functionStorage.address = addresses[0];
      } catch (err) {
        return null;
      }

      const nTokenData = getNTokenData();

      if (!!nTokenData?.address) {
        setAddress(nTokenData?.address);
      } else {
        setAddress(functionStorage.address);
      }
      setMetaMaskAddress(functionStorage.address);

      // const newMetaMaskAccountCheckInterval =
      setInterval(async function () {
        const gottenAddress = (
          await provider.request({
            method: "eth_requestAccounts",
          })
        )[0];
        // const existingAddress = addresses[0];
        // console.log("GOTTEN ADDRESS:", gottenAddress);
        // console.log("EXISTING ADDRESS:", existingAddress);
        if (gottenAddress !== functionStorage.address) {
          // console.log("ACC CHANGE:", gottenAddress);
          window.location.reload();
        }
      }, 2000);
      setStatus("MetaMask Connected", 2);
    } catch (err) {
      console.log("metamask init error:", err);
      throw err;
    }
  } else {
    console.log("MetaMask is uninstalled!");
    setPermaNoMint(true);
    setStatus(
      "MetaMask is not installed. " +
        "Please install MetaMask and reload this page."
    );
  }

  return provider;
};

const init = ({
  setStatus,
  setAddress,
  setIsLoading,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,
}) =>
  new Promise(async (resolve) => {
    setIsLoading(true);

    try {
      const provider = await loadProvider({
        setStatus,
        setAddress,
        setPermaNoMint,
        setMetaMaskAddress,
      });

      if (!!provider) {
        setProvider(provider);
        setIsConnected(true);
      }

      setIsLoading(false);

      return resolve({
        provider,
      });
    } catch (err) {
      console.log("error in loading MetaMask:", err);

      setIsLoading(false);
      // setStatus(`error in loading website: ${err.message}`);
      resolve({
        failMessage: `Error in loading MetaMask: ${err.message}`,
      });
    }
  });

export default init;
