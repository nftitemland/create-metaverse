import axios from "axios";
import React, { useState } from "react";
import "./UsernameElement.css";
import { API_BASE_URL } from "../../../constants";
import { getNTokenData } from "../../../utils/nToken";
import refreshUserData from "../../../api/refreshUserData";

// {/* <div className="Text">{`nftitem.net/${username}`}</div> */}

const allowedUsernameCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_";

const UsernameElement = ({
  userData,
  setUserData,
  address,
  isLoading,
  setIsLoading,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");

  const { username } = userData;

  // isLoading = !isLoading;

  const cancelButtonDisabled = isLoading;
  const saveButtonDisabled = isLoading;
  const editButtonDisabled = isLoading;
  const usernameInputDisabled = isLoading;
  const textEditMetaDisabled = isLoading;

  return (
    <div className="UsernameElement">
      <div className="TopBar">
        {editMode ? (
          <div
            className={
              textEditMetaDisabled ? "TextEditMeta Disabled" : "TextEditMeta"
            }
          >
            <input
              disabled={usernameInputDisabled}
              className={
                usernameInputDisabled
                  ? "UsernameInput Disabled"
                  : "UsernameInput"
              }
              value={usernameInput}
              onChange={(e) => {
                if (usernameInputDisabled) {
                  return;
                }

                // const newText = e.target.value.toLowerCase();
                const newText = e.target.value; //.toLowerCase();

                if (newText.length > 12) {
                  return;
                }
                for (const char of newText) {
                  if (!allowedUsernameCharacters.includes(char)) {
                    return;
                  }
                }

                setUsernameInput(newText);
              }}
            ></input>
          </div>
        ) : (
          <div className="TextMeta">
            <div className="Text">{username}</div>
          </div>
        )}
      </div>
      <div className={editMode ? "BottomBar EditMode" : "BottomBar"}>
        {editMode ? (
          <>
            <div
              className={
                cancelButtonDisabled
                  ? "CancelEditButton Disabled"
                  : "CancelEditButton"
              }
              onClick={() => {
                if (cancelButtonDisabled) {
                  return;
                }
                setUsernameInput("");
                setEditMode(false);
              }}
            >
              <div className="Label">{"Cancel"}</div>
            </div>
            <div
              className={
                saveButtonDisabled ? "SaveButton Disabled" : "SaveButton"
              }
              onClick={async () => {
                if (saveButtonDisabled) {
                  return;
                }

                try {
                  if (!usernameInput) {
                    return;
                  }

                  setIsLoading(true);

                  const nTokenData = getNTokenData();
                  await axios({
                    method: "POST",
                    url: `${API_BASE_URL}/expansive-world/user-data`,
                    headers: {
                      "nftitem-address": address,
                      "nftitem-ntoken": nTokenData?.nToken,
                    },
                    data: {
                      username: usernameInput,
                    },
                  });

                  await refreshUserData({
                    address,
                    nToken: nTokenData.nToken,
                    setUserData,
                  });
                  setEditMode(false);
                  setIsLoading(false);
                  setUsernameInput("");
                } catch (err) {
                  console.log("error in saving name", err);
                  // TODO set status

                  setIsLoading(false);
                }
              }}
            >
              <div className="Label">{"Save"}</div>
            </div>
          </>
        ) : (
          <div
            className="EditButton"
            onClick={() => {
              if (editButtonDisabled) {
                return;
              }
              setEditMode(true);
              setUsernameInput(userData.username || "");
            }}
          >
            <div className="Label">{"Edit"}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsernameElement;
