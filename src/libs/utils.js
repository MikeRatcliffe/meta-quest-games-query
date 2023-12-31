const COLOR = {
  RESET: "\x1b[0m",
  BRIGHT: "\x1b[1m",
  DIM: "\x1b[2m",
  UNDERSCORE: "\x1b[4m",
  BLINK: "\x1b[5m",
  REVERSE: "\x1b[7m",
  HIDDEN: "\x1b[8m",
  BLACK: "\x1b[30m",
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGENTA: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m",
  BGBLACK: "\x1b[40m",
  BGRED: "\x1b[41m",
  BGGREEN: "\x1b[42m",
  BGYELLOW: "\x1b[43m",
  BGBLUE: "\x1b[44m",
  BGMAGENTA: "\x1b[45m",
  BGCYAN: "\x1b[46m",
  BGWHITE: "\x1b[47m",
};

const HMD_PLATFORM = new Map([
  ["GEARVR", "Gear VR"],
  ["PACIFIC", "Oculus Go"],
  ["MONTEREY", "Meta Quest 1"],
  ["HOLLYWOOD", "Meta Quest 2"],
  ["SEACLIFF", "Meta Quest Pro"],
  ["RIFT", "Oculus Rift"],
  ["LAGUNA", "Oculus Rift S"],
]);

const jsonFilename = "vrgames.json";

function getHeadsetCodeName(headsetName) {
  for (const [codeName, value] of HMD_PLATFORM.entries()) {
    if (value === headsetName) {
      return codeName;
    }
  }

  throw new Error("Invalid headset name");
}

async function sleep(ms) {
  return new Promise((resolve) => setInterval(resolve, ms));
}

module.exports = {
  COLOR: COLOR,
  getHeadsetCodeName,
  jsonFilename,
  sleep,
};
