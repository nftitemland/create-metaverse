import React, { useEffect } from "react";
// import delay from "./utils/delay";
import "./SnackBar.css";

function SnackBar({ snackBarTime, setSnackBarTime, status }) {
  useEffect(() => {
    const intervalNumber = setInterval(() => {
      const newSnackbarTime = snackBarTime - 1;

      if (newSnackbarTime >= 0) {
        setSnackBarTime(newSnackbarTime);
      }
    }, 1000);

    return () => {
      clearInterval(intervalNumber);
    };
  }, [snackBarTime, setSnackBarTime]);

  return (
    snackBarTime > 0 && (
      <div className="SnackBarMeta">
        <div className="SnackBar">
          <div className="SnackBarMessageMeta">
            <div
              style={{
                width: 1,
                height: "100%",
                // backgroundColor: "green",
              }}
            >
              <div
                className="SnackBarExitButton"
                onClick={() => {
                  setSnackBarTime(0);
                }}
              >
                <div className="SnackBarExitButtonText"> {"x"}</div>
              </div>
            </div>
            <div className="SnackBarMessage">{status}</div>
            <div
              style={{
                width: 1,
                height: 5,
                // backgroundColor: "green",
              }}
            >
              {/* <div className="SnackBarExitButton" /> */}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default SnackBar;
