/**
 * [Re]generates a list of Quest games using the excellent oculusdb, which is a
 * database generated from the Oculus / Meta store.
 *
 * Step 2: Download images and save them to `/src/data/images`.
 *
 * 1. No special instructions... just run this script.
 */

"use strict";

const fs = require("fs").promises;
const { createWriteStream } = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { COLOR, sleep } = require("./libs/utils");

(async () => {
  const storeJsonPath = path.join(__dirname, "data", "store.json");
  const rawStoreData = await fs.readFile(storeJsonPath);
  const storeData = JSON.parse(rawStoreData);

  const imageFolderPath = path.join(__dirname, "data", "images");
  for (const { url, packageName } of storeData) {
    const ext = url.substring(url.indexOf("?") - 4, url.indexOf("?"));
    const imgPath = path.join(imageFolderPath, `${packageName}${ext}`);

    console.log(`${COLOR.BRIGHT}Getting ${COLOR.DIM}"${url}"${COLOR.RESET}...`);
    const response = await fetch(url);

    console.log(
      `${COLOR.BRIGHT}Creating ${COLOR.DIM}"${imgPath}"${COLOR.RESET}...`
    );
    response.body.pipe(createWriteStream(imgPath));

    // Random number 2000 - 4000 ms
    const duration = (Math.random() * 2 + 2) * 1000;
    console.log(`${COLOR.BRIGHT}Waiting for ${duration} ms${COLOR.RESET}`);
    await sleep(duration);
  }
})();
