/**
 * [Re]generates a list of Quest games using the excellent oculusdb, which is a
 * database generated from the Oculus / Meta store.
 *
 * Step 3: Resize images and save to `/src/data/changedimages/${size}`.
 *
 * 1. No special instructions... just run this script.
 */

"use strict";

const fs = require("fs").promises;
const path = require("path");
const { COLOR } = require("./libs/utils");
const sharp = require("sharp");

(async () => {
  const imageFolderPath = path.join(__dirname, "data", "images");
  const changedImageFolderPath = path.join(__dirname, "data", "changedimages");
  const dir = await fs.opendir(imageFolderPath);
  const sizes = ["250", "450", "374"];

  // Original image size: 720
  for (const size of sizes) {
    const sizePath = path.join(changedImageFolderPath, size);

    try {
      await fs.stat(sizePath);
    } catch (error) {
      await fs.mkdir(sizePath);
    }
  }

  for await (const dirent of dir) {
    const imgPath = path.join(imageFolderPath, dirent.name);

    try {
      console.log(
        `${COLOR.BRIGHT}Opening ${COLOR.DIM}"${imgPath}"${COLOR.RESET}`
      );
      const img = sharp(imgPath);

      console.log(
        `${COLOR.BRIGHT}Resizing ${COLOR.DIM}"${imgPath}"${COLOR.RESET}`
      );
      for (const size of sizes) {
        const sizePath = path.join(changedImageFolderPath, size);

        const changedImgPath = path.join(sizePath, dirent.name);
        await img.resize(size * 1).toFile(changedImgPath);
      }
    } catch (e) {
      console.log(`${COLOR.BGRED}${COLOR.WHITE} Not an image ${COLOR.RESET}`);
    }

    console.log(`--------------------------`);
  }
})();
