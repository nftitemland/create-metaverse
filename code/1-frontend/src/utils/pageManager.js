const CURRENT_PAGE = "CURRENT_PAGE";
const CURRENT_GAME_SECTION_MODE = "CURRENT_GAME_SECTION_MODE";

export const setCurrentPage = (page) => {
  localStorage.setItem(CURRENT_PAGE, page);
};

export const getCurrentPage = () => {
  const currentPage = localStorage.getItem(CURRENT_PAGE);

  return currentPage;
};

export const setCurrentGameSectionMode = (section) => {
  localStorage.setItem(CURRENT_GAME_SECTION_MODE, section);
};

export const getCurrentGameSectionMode = () => {
  const section = localStorage.getItem(CURRENT_GAME_SECTION_MODE);

  return section;
};
