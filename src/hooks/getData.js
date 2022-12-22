import axios from "axios";

export default async function getData(url) {
    const getData = await axios.get(url);
    return getData.data;
  }