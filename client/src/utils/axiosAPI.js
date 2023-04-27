import axios from "axios";

const Axios = (method, url, data) => {
  let request;
  if (method == "GET") {
    request = axios.get(url);
  }
  if (method == "POST") {
    request = axios.post(url, data);
  }

  return request;
};

export default Axios;
