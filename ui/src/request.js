import axios from "axios";

export default function request(method, url, payload) {
  return axios[method](`http://local`)
}