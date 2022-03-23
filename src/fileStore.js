import axios from "axios";
import sharp from "sharp";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
let {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv;

const firstReq = `https://cataas.com/cat/says/${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`;
const secondReq = `https://cataas.com/cat/says/${who}?width=${width}&height=${height}&color=${color}&s=${size}`;

async function compositeImages(image1, image2) {
  try {
    const data = await sharp()
      .composite([
        {
          input: image1,
          top: 0,
          left: 0,
        },
        {
          input: image2,
          top: 0,
          left: 400,
        },
      ])
      .resize(800, 500)
      .png()
      .toFile("cat-card.jpeg");
  } catch (error) {
    console.log(error);
  }
}

axios
  .get(firstReq)
  .then((res1) => {
    // console.log("res1", res1);
    axios
      .get(secondReq)
      .then((res2) => {
        compositeImages(
          Buffer.from(res1.data, "binary").toString("base64"),
          Buffer.from(res2.data, "binary").toString("base64")
        );
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });
