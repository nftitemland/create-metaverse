// import React, { useEffect, useState } from "react";
import MessagesMain from "./MessagesMain";
import "./PreMessages.css";

// const TitleComponent = () => {
//   return (
//     <div className="TitleComponentMeta">
//       <div className="TitleComponentTextMeta">
//         <div className="TitleComponentText">{"Messages"}</div>
//       </div>
//     </div>
//   );
// };

function Messages({
  address,
  userData,
  isLoading,
  setIsLoading,
  setPage,
  dialogMode = null,
}) {
  // return !!userData ? (
  //   <MessagesMain
  //     address={address}
  //     isLoading={isLoading}
  //     setIsLoading={setIsLoading}
  //   />
  // ) : (
  //   <div className="PreMessagesMeta">
  //     <TitleComponent />
  //     <div className="InfoMeta">
  //       <div className="InfoText">{"Must be logged in to use messaging."}</div>
  //     </div>
  //   </div>
  // );

  return (
    <MessagesMain
      address={(!!userData && address) || undefined}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      setPage={setPage}
      dialogMode={dialogMode}
    />
  );
}

export default Messages;
