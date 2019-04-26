import Raven from "raven-js";

function init() { }

function log(error) {
  console.log(error);
}

export default {
  init,
  log
};
