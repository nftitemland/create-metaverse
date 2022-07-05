// import React, { useEffect } from "react";
// import delay from "./utils/delay";
import "./Menu.css";
import { NULL_USER_ID, pages } from "./constants";
import { setCurrentPage } from "./utils/pageManager";

const pageData = [
  {
    title: "Game",
    page: pages.GAME,
  },

  // {
  //   title: "Staking",
  //   page: pages.ACCOUNT,
  // },

  {
    title: "Metaverse",
    page: pages.WORLD,
  },

  {
    title: "NFT Item Land",
    // title: "Account",
    page: pages.SETTINGS,
  },
];

const loggedInPageData = [
  {
    title: "Game",
    page: pages.GAME,
  },

  {
    title: "Staking",
    page: pages.ACCOUNT,
  },

  {
    title: "Metaverse",
    page: pages.WORLD,
  },

  {
    title: "NFT Item Land",
    // title: "Account",
    page: pages.SETTINGS,
  },
  // {
  //   title: "Messages",
  //   page: pages.MESSAGES,
  // },
];

const NOT_LOGGED_IN_MENU_HEIGHT = 275;

function Menu({
  menuIsOpen,
  setMenuIsOpen,
  windowWidth,
  page,
  setPage,
  userData,
}) {
  if (!menuIsOpen) {
    return null;
  }
  const isMobileMode = windowWidth < 994;

  const notLoggedInMode = !userData || userData?.userId === NULL_USER_ID;

  const pageDataToUse = notLoggedInMode ? pageData : loggedInPageData;

  const pageOptions = pageDataToUse.map((pageDatum, index) => {
    const cnPageOptionMeta =
      pageDatum.page === page ? "PageOptionMeta Selected" : "PageOptionMeta";

    return (
      <button
        className={index === 0 ? `${cnPageOptionMeta} Top` : cnPageOptionMeta}
        key={`pageOption${pageDatum.title}${index}`}
        style={{
          color: "black",
        }}
        onClick={() => {
          setPage(pageDatum.page);
          setCurrentPage(pageDatum.page);
          if (isMobileMode) {
            setMenuIsOpen(false);
          }
          window.scrollTo({
            top: 0,
            // behavior: "smooth",
          });
        }}
      >
        <div className={"PageOptionText"}>{pageDatum.title}</div>
      </button>
    );
  });

  const closeButtonMeta = (
    <div className={"CloseButtonMeta"}>
      <button
        style={{
          color: "black",
        }}
        className={"CloseButtonInner"}
        onClick={() => {
          setMenuIsOpen(!menuIsOpen);
        }}
      >
        <div className={"CloseButtonAsText"}>{"x"}</div>
      </button>
    </div>
  );

  const spacer = <div className={"RightSpacer"}></div>;

  const { leftElement, rightElement } = isMobileMode
    ? {
        leftElement: spacer,
        rightElement: closeButtonMeta,
      }
    : {
        leftElement: spacer,
        rightElement: closeButtonMeta,
      };

  return (
    <div
      className={"OuterOuterDialogOuterMeta"}
      style={{
        height: notLoggedInMode ? NOT_LOGGED_IN_MENU_HEIGHT : undefined,
      }}
    >
      <div
        className={userData ? "DialogOuterMeta LoggedIn" : "DialogOuterMeta"}
      >
        <div className={"DialogMeta"}>
          <div
            className={userData ? "Dialog LoggedIn" : "Dialog"}
            style={{
              height: notLoggedInMode ? NOT_LOGGED_IN_MENU_HEIGHT : undefined,
            }}
            // style={{
            //   // height: userData ? 280 : 210,
            // }}
          >
            <div className={"TitleHeaderMeta"}>
              <div className={"TitleHeader"}>
                {leftElement}
                <div className={"MenuTextMeta"}>
                  <div className={"MenuText"}>{"Menu"}</div>
                </div>
                {rightElement}
              </div>
            </div>
            {pageOptions}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
