import React, { useEffect, useState } from "react";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";
import "./Messages.css";
import MessageSection from "./MessageSection";
// import { pages } from "../../constants";
// import MetaMaskBox from "../../ConnectedMode/MyAccountV2/LoggedInInfoV2/MetaMaskBox";
import TitleSection from "../TitleSection";
// import loadMessages from "./loadMessages";

// const MAX_MESSAGE_LENGTH = 140;

/*
  TODO:
    chronic get
    full get
*/

// const runFunctionRecur

function MultiContentBoxMeta({ address, loadMessages }) {
  const [initialLoadTime, setInitialLoadTime] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  // const [pageData, setPageData] = useState([]);
  const [pageData, setPageData] = useState({});
  // const [pageData, setPageData] = useState([
  //   [
  //     getSampleMessageData({
  //       id: "abc1",
  //       timeOffset: 0,
  //     }),
  //     getSampleMessageData({
  //       id: "abc2",
  //       timeOffset: 100000,
  //     }),
  //     getSampleMessageData({
  //       id: "abc3",
  //       timeOffset: 20000000,
  //     }),
  //     getSampleMessageData({
  //       id: "abc4",
  //       timeOffset: 300000000000,
  //     }),
  //   ],
  // ]);
  // const [messageIdToData, setMessageIdToData] = useState({
  // const [nextMessagesData, setNextMessagesData] = useState(null);
  const [initialLoadHasStarted, setInitialLoadHasStarted] = useState(false);
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  // const [textInput, setTextInput] = useState("");

  useEffect(() => {
    if (!initialLoadHasStarted) {
      setInitialLoadTime(Date.now());
      setInitialLoadHasStarted(true);
      new Promise(async (resolve, reject) => {
        // await loadMessages({
        //   address,
        //   // messageIdToData,
        //   nextMessagesData,
        //   // setMessageIdToData,
        //   setNextMessagesData,
        // });

        resolve();
      });
    }

    // const intervalNumber = setInterval(async () => {
    //   // TODO: IF DIALOG OPEN DO NOT UPDATE
    //   // if (!dialogMode) {
    //   //   await loadMessages({
    //   //     // address,
    //   //     messageIdToData,
    //   //     setMessageIdToData,
    //   //     setNextMessagesData,
    //   //     doNotSetNextMessagesData: true,
    //   //   });
    //   // }
    //   // console.log("LOADING");
    // }, 5000);

    // return () => {
    //   clearInterval(intervalNumber);
    // };
  }, [
    // address,
    // messageIdToData,
    initialLoadHasStarted,
    loadMessages,
    // nextMessagesData,
  ]);

  const messageSectionActive = initialLoadTime;

  return (
    <div className="MultiContentBoxMeta">
      <div className="MessageBoxMeta">
        <TitleSection
          titleText="Rewards"
          // height = 60,
          // width = "100%",
          // argClassName,
        />
        {messageSectionActive && (
          <MessageSection
            // messageIdToData={messageIdToData}
            // nextMessagesData={nextMessagesData}
            // setMessageIdToData={setMessageIdToData}
            // setNextMessagesData={setNextMessagesData}
            initialLoadTime={initialLoadTime}
            address={address}
            loadMessages={loadMessages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageData={pageData}
            setPageData={setPageData}
            isLocalLoading={isLocalLoading}
            setIsLocalLoading={setIsLocalLoading}
          />
        )}
      </div>
    </div>
  );
}

export default MultiContentBoxMeta;
