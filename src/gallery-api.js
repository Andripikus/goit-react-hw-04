import axios from "axios";

const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "JzlsQk_gzbANiChIyz6tvmJbMeWXA-RJupEHhoRT3jw";

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        query,
        page,
        per_page: 12,
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch images. Please try again later.");
  }
};
