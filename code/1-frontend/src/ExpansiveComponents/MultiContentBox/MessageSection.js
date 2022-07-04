import React, { useEffect } from "react"; //  useEffect, useState
import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
import { getFirstDayOfWeek, pageNumberToTime } from "./local";
// import delay from "../../utils/delay";
const monthNumberToMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const JAN_1_EST_2020 = "1641013200000";

const LeftButton = ({
  triangleWidth,
  handleClick,
  disabled,
  leftButtonIsEndMode,
}) => {
  const color = leftButtonIsEndMode ? "black" : disabled ? "#DCDCDC" : "white";
  return (
    <div
      style={{
        // marginLeft
        // width: 50,
        // height: 50,
        // height: "100%",
        // backgroundColor: "rgb(7, 11, 34)",
        // backgroundColor: "pink",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: `${triangleWidth / 2}px ${triangleWidth}px ${
          triangleWidth / 2
        }px 0`,
        borderColor: `transparent ${color} transparent transparent`,
      }}
      onClick={handleClick}
    ></div>
  );
};

const RightButton = ({
  triangleWidth,
  handleClick,
  disabled,
  rightButtonIsEndMode,
}) => {
  // const color = disabled ? "black" : "white";
  const color = rightButtonIsEndMode ? "black" : disabled ? "#DCDCDC" : "white";

  return (
    <div
      style={{
        // width: 50,
        // height: 50,
        // height: "100%",
        // backgroundColor: "rgb(7, 11, 34)",
        // backgroundColor: "pink",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: `${triangleWidth / 2}px 0 ${
          triangleWidth / 2
        }px ${triangleWidth}px`,
        borderColor: `transparent transparent transparent ${color}`,
      }}
      onClick={handleClick}
    ></div>
  );
};

const MessageWrapper = ({ marginBottom = 10, marginTop = 10, children }) => {
  return (
    <div
      style={{
        width: "90%",
        marginTop,
        marginBottom,
      }}
    >
      {children}
    </div>
  );
};

function MessageSection({
  pageData,
  setPageData,
  pageNumber,
  setPageNumber,
  initialLoadTime,
  isLocalLoading,
  setIsLocalLoading,
  // nextMessagesData,
  address,
  loadMessages,
  // setMessageIdToData,
  // setNextMessagesData,
}) {
  useEffect(() => {
    new Promise(async (resolve, reject) => {
      if (!isLocalLoading && !pageData[pageNumber]) {
        setIsLocalLoading(true);

        try {
          const firstDayOfWeek = getFirstDayOfWeek(initialLoadTime);

          const { startTime, endTime } = pageNumberToTime({
            firstDayOfWeek,
            pageNumber,
          });

          const stakingRewards = await loadMessages({
            address,
            startTime,
            endTime,
          });

          // await delay(2000);

          const newPageData = Object.assign({}, pageData);

          newPageData[pageNumber] = stakingRewards;

          setPageData(newPageData);

          setIsLocalLoading(false);
        } catch (error) {
          console.log("error in loading staking data:", error);
          setIsLocalLoading(false);
        }
      }
      resolve();
    });

    // const messageTrack = document.getElementById("MessageTrackA");
    // messageTrack.scrollTop = messageTrack.scrollHeight;
    // messageTrack.scrollTo();
  }, [
    setPageData,
    isLocalLoading,
    pageData,
    pageNumber,
    loadMessages,
    setIsLocalLoading,
    address,
    initialLoadTime,
  ]);
  const messageData = pageData[pageNumber] || [];

  const messageElements = messageData.map((datum, index) => {
    // console.log(`

    //     MEGA LOG: ${JSON.stringify(
    //       {
    //         index,
    //         M: messageData.length,
    //         a: index === messageData.length - 1,
    //         s: index === messageData.length - 1 ? 20 : 0,
    //       },
    //       null,
    //       4
    //     )}

    // `);

    return (
      <MessageWrapper
        key={datum.id}
        // marginBottom={index === messageData.length - 1 ? 20 : 0}
      >
        <StakingRewardMessage stakingDatum={datum} />
        {index === messageData.length - 1 ? (
          <div
            style={{
              width: 10,
              height: 10,
              // backgroundColor: "green",
            }}
          />
        ) : null}
      </MessageWrapper>
    );
  });

  const firstDayOfWeek = getFirstDayOfWeek(initialLoadTime);

  const { startTime, endTime } = pageNumberToTime({
    firstDayOfWeek,
    pageNumber,
  });

  const startTimeDate = new Date(startTime);
  const endTimeDateFirst = new Date(endTime);

  const endTimeDate = new Date(
    endTimeDateFirst.getFullYear(),
    endTimeDateFirst.getMonth(),
    endTimeDateFirst.getDate() - 1
  );

  const rightButtonIsEndMode = pageNumber === 0;
  const leftButtonIsEndMode = startTime <= JAN_1_EST_2020;
  const leftButtonIsDisabled = isLocalLoading || leftButtonIsEndMode;
  const rightButtonIsDisabled = isLocalLoading || rightButtonIsEndMode;

  return (
    <div className="MessageSectionMeta">
      <div className="MessageTrackMeta">
        <div
          style={{
            width: "100%",
            // height: 100,
            // backgroundColor: "teal",
            backgroundColor: "#212746",

            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "flex-start",
            // alignItems: "center",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 400,
              // height: 50,
              // backgroundColor: "blue",

              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {messageElements}
            {/* {messages} */}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 50,
          // backgroundColor: "darkblue",
          backgroundColor: "black",

          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            width: 50,
            // backgroundColor: leftButtonIsDisabled ? "blanchedalmond" : "pink",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            if (leftButtonIsDisabled) {
              return;
            }

            setPageNumber(pageNumber - 1);
          }}
        >
          <LeftButton
            triangleWidth={45}
            disabled={leftButtonIsDisabled}
            leftButtonIsEndMode={leftButtonIsEndMode}
          />
        </div>
        <div
          style={{
            width: 185,
            height: "100%",
            // backgroundColor: "pink",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "white",
              fontFamily: `"Tajawal", sans-serif`,
            }}
          >
            {`${
              monthNumberToMonth[startTimeDate.getMonth()]
            } ${startTimeDate.getDate()}`}
          </div>
          <div
            style={{
              color: "white",
              fontFamily: `"Tajawal", sans-serif`,
            }}
          >
            {`${
              monthNumberToMonth[endTimeDate.getMonth()]
            } ${endTimeDate.getDate()}`}
          </div>
        </div>

        <div
          style={{
            height: "100%",
            width: 50,
            // backgroundColor: rightButtonIsDisabled ? "blanchedalmond" : "pink",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            if (rightButtonIsDisabled) {
              return;
            }

            setPageNumber(pageNumber + 1);
          }}
        >
          <RightButton
            triangleWidth={45}
            disabled={rightButtonIsDisabled}
            rightButtonIsEndMode={rightButtonIsEndMode}
          />
        </div>
      </div>
    </div>
  );
}

export default MessageSection;
