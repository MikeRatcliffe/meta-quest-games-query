/**
 * [Re]generates a list of Quest games using the excellent oculusdb, which is a
 * database generated from the Oculus / Meta store.
 *
 * Step 1: Add app package names to `store.json`.
 *
 * 1. Copy the `.section__items-cell` list from the following URLs into
 *    `store.json` (scroll down to list everything first):
 *      - https://www.oculus.com/experiences/quest/section/391914765228253/
 *      - https://www.oculus.com/experiences/quest/section/3955297897903802/
 * 2. Use whatever methods you can find to change the HTML to JSON object array
 *    that looks like this:
 *
 *    ```
 *    {
 *      "id": "2160364850746031",
 *      "url": "https://scontent.oculuscdn.com/v/t64.5771-25/57569471_887316905909037_4854831245115453746_n.jpg?stp=dst-jpg_q92_s720x720&_nc_cat=104&ccb=1-7&_nc_sid=79b88e&_nc_ohc=QlmbBgeOddAAX-uHofy&_nc_ht=scontent.oculuscdn.com&oh=00_AfB0UQExxDple9qvC4q1jTeMNKCjrN5d68bv-7EqmwNmgA&oe=64C98F34",
 *      "title": "After the Fall®"
 *    }
 *    ```
 * 3. Run this script.
 * 4. Replace the contents of `store.json` with the console output.
 */

"use strict";

const fs = require("fs").promises;
const path = require("path");

(async () => {
  const storeJsonPath = path.join(__dirname, "data", "store.json");
  const rawStoreData = await fs.readFile(storeJsonPath);
  const storeData = JSON.parse(rawStoreData);

  const gameJsonPath = path.join(__dirname, "data", "vrgames.json");
  const rawGameData = await fs.readFile(gameJsonPath);
  const gameObj = JSON.parse(rawGameData);

  const gameMap = new Map();
  for (const game of gameObj) {
    gameMap.set(game.id, game.packageName);
  }

  storeData.map((game) => {
    game.packageName = gameMap.get(game.id);
    return game;
  });

  console.log(JSON.stringify(storeData));
})();
