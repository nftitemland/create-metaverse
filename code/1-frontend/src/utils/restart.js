// import { deleteNTokenData } from "./nToken";

let lastRestartRequest = 0;

const restart = () => {
  if (Date.now() - lastRestartRequest > 1000 * 3) {
    lastRestartRequest = Date.now();

    localStorage.clear();
    window.location.reload();
  }
};

export default restart;
