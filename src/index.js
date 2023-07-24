/**
 * Generates a list of Quest games that are supported on the Quest 2 and not on Quest 1.
 * Demos and trials are excluded.
 */

"use strict";

const fs = require("fs").promises;
const path = require("path");
const { COLOR, getHeadsetCodeName, jsonFilename } = require("./libs/utils");

const filter = (game) => {
  // Filter that includes all non-applab games that run on the Quest 2 but not
  // on the Quest 1.
  return (
    game.supported_hmd_platforms.includes(getHeadsetCodeName("Meta Quest 2")) &&
    !game.supported_hmd_platforms.includes(
      getHeadsetCodeName("Meta Quest 1")
    ) &&
    !game.is_concept
  );
};

(async () => {
  const jsonPath = path.join(__dirname, "data", jsonFilename);
  const rawdata = await fs.readFile(jsonPath);
  const games = JSON.parse(rawdata);

  const filtered = new Set(games.filter(filter));

  console.log(`${filtered.size} results:`);

  for (const game of filtered) {
    console.log(
      `  - ${COLOR.BRIGHT}${game.displayName} ${
        COLOR.RESET
      }(${game.genre_names.join(", ")}) ${
        COLOR.DIM
      }https://www.oculus.com/experiences/quest/${game.id}${COLOR.RESET}`
    );
  }
})();
