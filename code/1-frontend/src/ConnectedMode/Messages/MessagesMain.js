import React, { useEffect, useState } from "react";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";
import "./Messages.css";
import MessageSection from "./MessageSection";
import { pages } from "../../constants";
import { setCurrentPage } from "../../utils/pageManager";
// import MetaMaskBox from "../../ConnectedMode/MyAccountV2/LoggedInInfoV2/MetaMaskBox";
import loadMessages from "./loadMessages";
import sendMessage from "./sendMessage";

const MAX_MESSAGE_LENGTH = 140;

/*
  TODO:
    chronic get
    full get
*/

// const runFunctionRecur

function MessagesMain({
  address,
  isLoading,
  setIsLoading,
  setPage,
  dialogMode,
}) {
  const [messageIdToData, setMessageIdToData] = useState({});
  const [nextMessagesData, setNextMessagesData] = useState(null);
  const [initialLoadHasStarted, setInitialLoadHasStarted] = useState(false);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    if (!initialLoadHasStarted) {
      setInitialLoadHasStarted(true);
      new Promise(async (resolve, reject) => {
        await loadMessages({
          // address,
          messageIdToData,
          setMessageIdToData,
          setNextMessagesData,
        });

        resolve();
      });
    }

    const intervalNumber = setInterval(async () => {
      // TODO: IF DIALOG OPEN DO NOT UPDATE

      if (!dialogMode) {
        await loadMessages({
          // address,
          messageIdToData,
          setMessageIdToData,
          setNextMessagesData,
          doNotSetNextMessagesData: true,
        });
      }
      // console.log("LOADING");
    }, 5000);

    return () => {
      clearInterval(intervalNumber);
    };
  }, [address, messageIdToData, initialLoadHasStarted, dialogMode]);

  return (
    <div className="MessagesMeta">
      <div className="MessageBoxMeta">
        <div className="TitleMeta">
          <div className="TitleTextMeta">
            <div className="TitleText">{"NFT Chat"}</div>
          </div>
        </div>
        <MessageSection
          messageIdToData={messageIdToData}
          nextMessagesData={nextMessagesData}
          address={address}
          setMessageIdToData={setMessageIdToData}
          setNextMessagesData={setNextMessagesData}
        />
        {address ? (
          <div className="TypingSectionMeta">
            <div className="InputMeta">
              <textarea
                // disabled={isLoading}
                className="MessageInput"
                value={textInput}
                onChange={(event) => {
                  const inputText = event.target.value;

                  if (inputText.length > MAX_MESSAGE_LENGTH) {
                    return;
                  }

                  setTextInput(inputText);
                }}
              />
            </div>

            <div className="SendButtonMeta">
              {/* <div className="SendButton"></div> */}
              <div
                className={
                  isLoading ? "SendAnonButton Loading" : "SendAnonButton"
                }
                onClick={async () => {
                  if (isLoading) {
                    return;
                  }

                  if (!textInput || textInput.length > MAX_MESSAGE_LENGTH) {
                    return;
                  }

                  setIsLoading(true);

                  setTextInput("");

                  const message = textInput;
                  try {
                    await sendMessage({
                      address,
                      message,
                      messageIdToData,
                      // nextMessagesData,
                      setMessageIdToData,
                      setNextMessagesData,
                    });
                    setIsLoading(false);
                  } catch (err) {
                    console.log("error in sending message:", err);
                    setIsLoading(false);
                  }
                }}
              >
                <div className="SendAnonLabel">{"send"}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="PreTypingSectionMeta">
            <div className="TextMeta">
              <div
                className="Text"
                onClick={() => {
                  setPage(pages.ACCOUNT);
                  setCurrentPage(pages.ACCOUNT);
                }}
              >
                {"login to send messages"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesMain;
