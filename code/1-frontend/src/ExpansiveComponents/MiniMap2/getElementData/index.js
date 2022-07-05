// import getStandardElement from "./getStandardElement";
import getHigherRealmData from "./getHigherRealmData";
import getUpperPoiData from "./getUpperPoiData";
import getFlamingoData from "./getFlamingoData";
import getFlamingoValleyData from "./getFlamingoValleyData";
import getNftItemTowersData from "./getNftItemTowersData";
import { areaNames } from "../../../constants";

const getElementData = ({
  mobileMode,
  landsData,
  area,
  squareWidth,
  animeTime,
  m,
  n,
  selectedLandData,
  setSelectedLandData,
  updateDialogMode,
  setNftPreviewDialogData,
  windowWidth,
  windowHeight,
  mainGroundColor,
}) => {
  switch (area) {
    case areaNames.HIGHER_REALM:
      return getHigherRealmData({
        landsData,
        squareWidth,
        m,
        n,
        selectedLandData,
        setSelectedLandData,
        mobileMode,
        updateDialogMode,
        setNftPreviewDialogData,
        // yScrollOffset,
      });
    case areaNames.UPPER_POI:
      return getUpperPoiData({ landsData, squareWidth });
    case areaNames.FLAMINGO_LAND:
      return getFlamingoData({
        mobileMode,
        landsData,
        squareWidth,
        animeTime,
        m,
        n,
        selectedLandData,
        setSelectedLandData,
        updateDialogMode,
        setNftPreviewDialogData,
        windowWidth,
      });
    case areaNames.FLAMINGO_VALLEY:
      // return getFlamingoValleyData({ landsData, squareWidth, animeTime });
      return getFlamingoValleyData({
        windowHeight,
        mobileMode,
        landsData,
        squareWidth,
        animeTime,
        selectedLandData,
        setSelectedLandData,
        m,
        n,
        updateDialogMode,
        setNftPreviewDialogData,
      });

    case areaNames.PROMO:
      // return getFlamingoValleyData({ landsData, squareWidth, animeTime });
      return getNftItemTowersData({
        mobileMode,
        landsData,
        windowHeight,
        squareWidth,
        animeTime,
        selectedLandData,
        setSelectedLandData,
        m,
        n,
        updateDialogMode,
        setNftPreviewDialogData,
        mainGroundColor,
      });
    // breakl

    default:
      return {};
  }
};

export default getElementData;
