import { useState } from "react";
import { dialogModes } from "../constants";

function useDialog({ setMenuIsOpen }) {
  const [dialogModeImage, setDialogModeImage] = useState("");
  const [dialogModeImageLastScrollHeight, setDialogModeImageLastScrollHeight] =
    useState(null);
  const [dialogMode, setDialogMode] = useState(null);
  // const [dialogMode, setDialogMode] = useState("REALPOI_NEWS");
  // const [dialogMode, setDialogMode] = useState("LANDS_PREVIEW");
  const [dialogIsClosing, setDialogIsClosing] = useState(null);

  const updateDialogMode = (mode) => {
    setDialogMode(mode);
    setMenuIsOpen(false);
  };

  const closeDialog = (closeSpeed = 20) => {
    if (dialogIsClosing) {
      return;
    }
    setDialogIsClosing(true);

    setTimeout(() => {
      const dm = dialogMode;

      updateDialogMode(null);
      setDialogIsClosing(false);

      if (dm === dialogModes.IMAGE) {
        window.scrollTo({
          top: dialogModeImageLastScrollHeight,
        });
      }
      //   // const miniMap2 = document.getElementById("MiniMap2");
      //   const crypDollsDoll = document.getElementById("CrypDollsDoll");

      //   if (crypDollsDoll && crypDollsDoll.scrollHeight) {
      //     window.scrollTo({
      //       top: crypDollsDoll.scrollHeight,
      //       // behavior: "smooth",
      //     });
      //   }
      // }
      // }, 210);
    }, closeSpeed);
  };

  const setImageDialog = (image) => {
    setDialogModeImage(image);
    setDialogModeImageLastScrollHeight(window.scrollY);
    setDialogMode(dialogModes.IMAGE);
  };

  return {
    dialogMode,
    closeDialog,
    setDialogMode,
    setImageDialog,
    dialogIsClosing,
    updateDialogMode,
    dialogModeImage,
  };
}

export default useDialog;
