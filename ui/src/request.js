import axios from "axios";

export const SERVER_URL = "http://74.207.232.171:3000/api/v1";

export default function wrapApi(url) {
  return `${SERVER_URL}${url}`;
}