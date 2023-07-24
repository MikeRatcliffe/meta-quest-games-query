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
    const {
      displayName,
      genre_names,
      id,
      release_channels: { count },
    } = game;
    const { BRIGHT, RED, RESET, DIM } = COLOR;
    const preOrderString = count === 0 ? " Pre-order" : "";
    const genres = ` (${genre_names.join(", ")}) `;

    console.log(
      `  - ${BRIGHT}${displayName}${RED}${preOrderString}${RESET}${genres}${DIM}https://www.oculus.com/experiences/quest/${id}${COLOR.RESET}`
    );
  }
})();
