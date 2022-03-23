import axios from "axios";
import sharp from "sharp";
import minimist from "minimist";

//base url have to set it on .env file
const imageBaseUrl = "https://cataas.com/cat/says/";

//Costants
const fileName = "cat-card.jpeg";

const argv = minimist(process.argv.slice(2));
let {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv;

const firstReq = `${imageBaseUrl}${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`;

const secondReq = `${imageBaseUrl}${who}?width=${width}&height=${height}&color=${color}&s=${size}`;

//function for bind images together
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

//get frist image
axios
  .get(firstReq, { responseType: "stream" })
  .then((res1) => {
    // get secoud image
    axios
      .get(secondReq, { responseType: "stream" })
      .then((res2) => {
        compositeImages(
          Buffer.from(res1.data, "binary"),
          Buffer.from(res2.data, "binary")
        );
      })
      .catch((error) => {
        console.error("error2", error);
      });
  })
  .catch((error) => {
    console.error("error1", error);
  });
