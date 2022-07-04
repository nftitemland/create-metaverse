import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import useWindowSize from "./hooks/useWindowSize";
import useStatus from "./hooks/useStatus";
import NewApp from "./NewApp";
import { getNTokenData, deleteNTokenData } from "./utils/nToken";
import restart from "./utils/restart";
import refreshUserData from "./api/refreshUserData";
import smoothScrollPolyfill from "./polyfills/smoothScrollPolyfill";
import { isProductionMode } from "./constants";
// const NewApp = React.lazy(() => import("./NewApp"));

console.log("PoiPoi❤️❤️❤️");

smoothScrollPolyfill();

const SplashScreen = ({ setSplashScreenMode, setUserData, setAddress }) => {
  useEffect(() => {
    if (
      isProductionMode &&
      ![
        process.env.REACT_APP_POWER_2_URL || "ZARBONCOMPLEXYXENOPHONT",
        "https://www.nftitemland.com",
      ].includes(window.location.origin)
    ) {
      window.location = "https://www.nftitemland.com";
      return;
    }

    const nTokenData = getNTokenData();

    if (!nTokenData) {
      setSplashScreenMode(false);
      return;
    }

    const { expiry } = nTokenData;

    const nTokenIsExpired = Date.now() > expiry;

    if (nTokenIsExpired) {
      deleteNTokenData();
      setSplashScreenMode(false);
      // TODO: add message saying login session has expired
      return;
    }

    new Promise(async (resolve, reject) => {
      try {
        setAddress(nTokenData.address);
        await refreshUserData({
          address: nTokenData.address,
          nToken: nTokenData.nToken,
          setUserData,
        });
        setSplashScreenMode(false);
      } catch (err) {
        console.log("error in loading user data:", err);

        return restart();
      }
    });
  }, [setSplashScreenMode, setUserData, setAddress]);

  return <div></div>;
};

function App() {
  const [windowWidth, windowHeight] = useWindowSize();
  // const [websiteVersion, setWebsiteVersion] = useState(2);
  const { status, setStatus, snackBarTime, setSnackBarTime, updateStatus } =
    useStatus();

  // const [status, setStatus] = useState("test a");
  // const [snackBarTime, setSnackBarTime] = useState(4);
  const [splashScreenMode, setSplashScreenMode] = useState(true);
  const [address, setAddress] = useState(null);
  const [metaMaskAddress, setMetaMaskAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [permaNoMint, setPermaNoMint] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userDataLandClaim, setUserDataLandClaim] = useState(null);
  const [profiles, setProfiles] = useState([]);

  return (
    <div className="Meta">
      {splashScreenMode ? (
        <SplashScreen
          setSplashScreenMode={setSplashScreenMode}
          // setIsLoggedIn={setIsLoggedIn}
          setAddress={setAddress}
          setUserData={setUserData}
        />
      ) : (
        <NewApp
          // className="NewAppMeta"
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          // setWebsiteVersion={setWebsiteVersion}
          status={status}
          setStatus={setStatus}
          snackBarTime={snackBarTime}
          setSnackBarTime={setSnackBarTime}
          address={address}
          setAddress={setAddress}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          provider={provider}
          setProvider={setProvider}
          permaNoMint={permaNoMint}
          setPermaNoMint={setPermaNoMint}
          updateStatus={updateStatus}
          // isLoggedIn={isLoggedIn}
          // setIsLoggedIn={setIsLoggedIn}
          userData={userData}
          setUserData={setUserData}
          metaMaskAddress={metaMaskAddress}
          setMetaMaskAddress={setMetaMaskAddress}
          profiles={profiles}
          setProfiles={setProfiles}
          userDataLandClaim={userDataLandClaim}
          setUserDataLandClaim={setUserDataLandClaim}
        />
      )}
    </div>
  );
}

export default App;
