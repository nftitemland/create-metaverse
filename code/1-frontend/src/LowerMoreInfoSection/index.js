import React, { useState, useEffect } from "react";
import "./LowerMoreInfoSection.css";
import moreInfoData from "./moreInfoData";
import delay from "../utils/delay";

const MoreInfoSection = ({
  moreInfoDatum,
  index,
  maxComHeight = 80,
  diff = 1,
  upDelayTimeout = 0.5,
  downDelayTimeout = 1,
  cnInfoSectionComponent,
  cnInfoSectionTopicText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [up, setUp] = useState(true);
  const [comHeight, setComHeight] = useState(12);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const isTop = index === 0;
  const isLast = index === moreInfoData.length - 1;

  useEffect(() => {
    Promise.resolve().then(async () => {
      if (isLocalLoading && up) {
        if (comHeight < maxComHeight) {
          await delay(upDelayTimeout);

          setComHeight(comHeight + diff);
        } else {
          setIsLocalLoading(false);
          setIsOpen(true);
          setUp(false);
        }
      } else if (isLocalLoading && !up) {
        if (comHeight > 12) {
          await delay(downDelayTimeout);

          setComHeight(comHeight - diff);
        } else {
          setIsLocalLoading(false);
          setIsOpen(false);
          setUp(true);
        }
      }
    });
  }, [
    comHeight,
    isLocalLoading,
    up,
    diff,
    maxComHeight,
    upDelayTimeout,
    downDelayTimeout,
  ]);

  return (
    <div key={moreInfoDatum.topic + index} className={cnInfoSectionComponent}>
      <div
        onClick={() => {
          if (isLocalLoading) {
            return;
          }
          setIsOpen(false);
          setIsLocalLoading(true);
        }}
        className={
          isTop
            ? "InfoSectionTopicTextMeta FirstTopicTextMeta"
            : "InfoSectionTopicTextMeta"
        }
      >
        <div className={cnInfoSectionTopicText}>{moreInfoDatum.topic}</div>
      </div>
      {isOpen ? (
        <div
          className={
            isLast
              ? "InfoSectionCommunicationTextMeta LastCommunicationTextMeta"
              : "InfoSectionCommunicationTextMeta"
          }
        >
          <div className="InfoSectionCommunicationText">
            {moreInfoDatum.communication}
          </div>
        </div>
      ) : (
        <div
          className={
            isLast
              ? "InfoSectionCommunicationTextMetaOff LastCommunicationTextMetaOff"
              : "InfoSectionCommunicationTextMetaOff"
          }
          style={{
            height: comHeight,
          }}
        />
      )}
    </div>
  );
};

const MoreInfo = ({ cnInfoSectionTopicText, cnInfoSectionComponent }) => {
  return moreInfoData.map((moreInfoDatum, index) => {
    // const [isOpen, setIsOpen] = useState(false);

    return (
      <MoreInfoSection
        key={`TheKey${index}-${moreInfoDatum.diff || "x"}`}
        moreInfoDatum={moreInfoDatum}
        index={index}
        diff={moreInfoDatum.diff}
        maxComHeight={moreInfoDatum.maxComHeight}
        cnInfoSectionTopicText={cnInfoSectionTopicText}
        cnInfoSectionComponent={cnInfoSectionComponent}
      />
    );
  });
};

const getStyles = ({ isMobileMode, modalMode, modalMode2 }) => {
  if (modalMode) {
    return {
      cnLowerMoreInfoSection: "LowerMoreInfoSection ModalMode",
      cnInfoSectionMeta: "InfoSectionMeta ModalMode",
      cnTitleText: isMobileMode
        ? "TitleText ModalModeMobile"
        : "TitleText ModalMode",
      cnInfoSectionComponent: "InfoSectionComponent ModalMode",
      cnInfoSectionTopicText: "InfoSectionTopicText ModalMode",
      cnTitleTextMeta: "TitleTextMeta ModalMode",
    };
  } else if (modalMode2) {
    return {
      cnLowerMoreInfoSection: "LowerMoreInfoSection ModalMode2",
      cnInfoSectionMeta: "InfoSectionMeta ModalMode2",
      cnTitleText: isMobileMode
        ? "TitleText ModalMode2Mobile"
        : "TitleText ModalMode2",
      cnInfoSectionComponent: "InfoSectionComponent ModalMode2",
      cnInfoSectionTopicText: "InfoSectionTopicText ModalMode2",
      cnTitleTextMeta: "TitleTextMeta ModalMode2",
    };
  }

  return {
    cnLowerMoreInfoSection: "LowerMoreInfoSection",
    cnInfoSectionMeta: "InfoSectionMeta",
    cnTitleText: isMobileMode ? "TitleText Mobile" : "TitleText",
    cnInfoSectionTopicText: "InfoSectionTopicText",
    cnInfoSectionComponent: "InfoSectionComponent",
    cnTitleTextMeta: "TitleTextMeta",
  };
};

function LowerMoreInfoSection({ windowWidth, modalMode, modalMode2 }) {
  const isMobileMode = windowWidth < 700;

  const {
    cnLowerMoreInfoSection,
    cnInfoSectionMeta,
    cnTitleText,
    cnInfoSectionTopicText,
    cnTitleTextMeta,
    cnInfoSectionComponent,
  } = getStyles({
    isMobileMode,
    modalMode,
    modalMode2,
  });

  return (
    <div className={cnLowerMoreInfoSection}>
      <div className={cnTitleTextMeta}>
        <div className={cnTitleText}>{"F.A.Q."}</div>
      </div>
      <div className={cnInfoSectionMeta}>
        <MoreInfo
          cnInfoSectionTopicText={cnInfoSectionTopicText}
          cnInfoSectionComponent={cnInfoSectionComponent}
        />
      </div>
    </div>
  );
}

export default LowerMoreInfoSection;

// const { cnPalaceMain, cnPalaceJuice } = isMobileMode
//   ? {
//       cnPalaceMain: "PalaceMain Mobile",
//       cnPalaceJuice: "PalaceJuice Mobile",
//     }
//   : {
//       cnPalaceMain: "PalaceMain",
//       cnPalaceJuice: "PalaceJuice",
//     };
