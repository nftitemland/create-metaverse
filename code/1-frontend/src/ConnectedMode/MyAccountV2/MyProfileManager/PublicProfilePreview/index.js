import "./PublicProfilePreview.css";
import Profile from "../../../../ExpansiveComponents/Profile";

const getArtPoints = ({ userData }) => {
  if (userData?.visibilities?.ART_POINTS) {
    return userData.artPoints || 0;
  }

  return undefined;
};

const PublicProfilePreview = ({ userData, address }) => {
  // TODO: import real profile section
  // TODO: make address/art points optional

  const temporaryUserData = Object.assign({}, userData, {
    // visibilities: {
    //   ART_POINTS: true,
    //   // ADDRESS: false,
    //   ADDRESS: true,
    // },
    // artPoints: 1000,
  });

  const artPoints = getArtPoints({
    userData: temporaryUserData,
  });

  return (
    <div className={"PublicProfilePreviewMetaContainer"}>
      <div className={"PublicProfilePreviewMeta"}>
        <div className="TopInfoMeta">
          <div className="TopInfo">
            <div className="InfoText">{"Preview My Profile"}</div>
          </div>
        </div>
        <div className={"PublicProfilePreviewBox"}>
          <Profile
            username={
              (temporaryUserData?.visibilities?.USERNAME &&
                !!userData?.username &&
                userData?.username) ||
              ""
            }
            address={
              (temporaryUserData?.visibilities?.ADDRESS &&
                !!address &&
                address) ||
              undefined
            }
            artPoints={artPoints}
          />
        </div>
        {false && (
          <div className={"PublicProfilePreview"}>
            <div className="TitleMeta">
              <div className="TitleTextMeta">
                <div className="TitleText">{userData.username}</div>
              </div>
            </div>
            <div className="SecondLifeSection">
              <div className="ArtPointsMeta">
                <div className="Text">{`Pixie Crystals: ${
                  userData.miniGameFinishAmount || 0
                }`}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProfilePreview;
