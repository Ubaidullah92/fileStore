import axios from "axios";
import sharp from "sharp";
import minimist from "minimist";
import { fetchImages } from "./services/services.js";

//Costants
const fileName = "cat-card.jpeg";

const argv = minimist(process.argv.slice(2));
const {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv;

//get images from url
const getImages = async (image1, image2) => {
  try {
    //get first image
    const res1 = await fetchImages(greeting, width, height, color, size);
    if (res1.data) {
      //then get secound image
      const res2 = await fetchImages(who, width, height, color, size);
      if (res2.data) {
        compositeImages(
          Buffer.from(res1.data, "binary"),
          Buffer.from(res2.data, "binary")
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

getImages();

//function for binding images together
const compositeImages = async (image1, image2) => {
  try {
    const data = await sharp(image1)
      .composite([
        {
          input: image2,
          top: 0,
          left: width,
        },
      ])
      .resize(width * 2, height)
      .jpeg()
      .toFile(fileName);
  } catch (error) {
    console.log(error);
  }
};
