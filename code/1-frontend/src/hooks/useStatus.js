import { useState } from "react";

function useStatus() {
  const [status, setStatus] = useState("");
  const [stateSnackBarTime, setSnackBarTime] = useState(0);

  const updateStatus = (status, snackBarTime = 3) => {
    setStatus(status);
    setSnackBarTime(stateSnackBarTime + snackBarTime);
  };

  return {
    status,
    setStatus,
    snackBarTime: stateSnackBarTime,
    setSnackBarTime,
    updateStatus,
  };
}

export default useStatus;
