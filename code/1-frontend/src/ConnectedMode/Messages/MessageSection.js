import React, { useEffect } from "react"; //  useEffect, useState
// import { getNTokenData } from "../../utils/nToken";
import InfiniteScroll from "react-infinite-scroll-component";
// import axios from "axios";
import loadMessages from "./loadMessages";
import "./Messages.css";

const Message = ({ message }) => {
  return (
    <div className="MessageBox">
      <div className="TextMeta">
        <div className="Message">{"Anon: " + message}</div>
      </div>
    </div>
  );
};

function MessageSection({
  messageIdToData,
  nextMessagesData,
  address,
  setMessageIdToData,
  setNextMessagesData,
}) {
  useEffect(() => {
    const messageTrack = document.getElementById("MessageTrack");

    // messageTrack.scrollTop = messageTrack.scrollHeight;
    messageTrack.scrollTo();
  }, [messageIdToData]);

  // console.log(`

  //     nextMessagesData LOG: ${JSON.stringify(
  //       {
  //         nextMessagesData,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  const messagesElementData = Object.keys(messageIdToData).map((messageId) => {
    const data = messageIdToData[messageId];

    return {
      time: data.time,
      element: <Message key={data.id} message={data.message} />,
    };
  });

  messagesElementData.sort((a, b) => {
    return b.time - a.time;
  });

  const messages = messagesElementData.map(({ time, element }) => {
    return element;
  });

  return (
    <div className="MessageSectionMeta">
      <div className="MessageTrackMeta">
        <div id={"MessageTrack"} className="MessageTrack">
          {/* <PreviousSearchMeta /> */}

          <InfiniteScroll
            scrollableTarget={"MessageTrack"}
            dataLength={messages.length}
            next={async () => {
              await loadMessages({
                address,
                nextMessagesData,
                messageIdToData,
                setMessageIdToData,
                setNextMessagesData,
              });
            }}
            // inverse={true}
            // style={{ display: "flex", flexDirection: "column-reverse" }}
            hasMore={!!nextMessagesData}
            loader={
              <h4
                style={{
                  fontFamily: `"Tajawal", sans-serif`,
                }}
              >
                ...
              </h4>
            }
            height={300}
            style={{
              width: "100%",
              // backgroundColor: "black",
              // overflowY: "hidden",
            }}
            initialScrollY={0}
            endMessage={
              <p
                style={{
                  textAlign: "center",
                  fontFamily: `"Tajawal", sans-serif`,
                }}
              >
                <b>- - -</b>
              </p>
            }
          >
            {messages}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default MessageSection;
