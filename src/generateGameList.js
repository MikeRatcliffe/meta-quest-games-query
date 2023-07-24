/**
 * [Re]generates a list of Quest games using the excellent oculusdb, which is a
 * database generated from the Oculus / Meta store.
 */

"use strict";

const fs = require("fs").promises;
const path = require("path");
const fetch = require("node-fetch");
const { COLOR, jsonFilename } = require("./libs/utils");

(async () => {
  const games = removeDuplicateGames(await getGameData()).sort((a, b) => {
    if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
      return 1;
    }
    if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
      return -1;
    }
    return 0;
  });

  await writeGameDataToJson(games);
})();

async function getGameData() {
  const oculusDbUrl = "https://oculusdb.rui2015.me/api/v1/allapps";
  console.log(`Getting new game data from ${oculusDbUrl}`);

  const response = await fetch(oculusDbUrl);

  return await response.json();
}

async function writeGameDataToJson(games) {
  const jsonPath = path.join(__dirname, "data", jsonFilename);
  const gamesJson = JSON.stringify(games, null, 2).replace(
    /[\u007f-\uffff]/g,
    function (c) {
      return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
    }
  );

  try {
    console.log(`Generating ${jsonPath}`);
    await fs.writeFile(jsonPath, gamesJson, { encoding: "utf8" });
  } catch (error) {
    console.log(
      `${COLOR.BGRED}${COLOR.BRIGHT} Error writing ${jsonPath} ${COLOR.RESET}`,
      error
    );
  }
}

function removeDuplicateGames(games) {
  console.log(`Removing duplicate games`);

  const seen = new Set();

  return games.filter((game) => {
    if (seen.has(game.id)) {
      return false;
    }
    seen.add(game.id);
    return true;
  });
}
