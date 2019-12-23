import axios from "axios";

export const SERVER_URL = "https://ravn-naijahacks-2019.bakman.build:3000/api/v1";

export default function wrapApi(url) {
  return `${SERVER_URL}${url}`;
}