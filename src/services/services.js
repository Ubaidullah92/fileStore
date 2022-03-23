import { axiosClient } from "./client.js";

export const fetchImages = (text, width, height, color, size) => {
  return axiosClient({
    //Main Url can be assing in .env file
    url: `https://cataas.com/cat/says/${text}`,
    method: "GET",
    params: {
      width,
      height,
      color,
      s: size,
    },
  });
};
