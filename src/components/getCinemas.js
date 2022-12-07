import axios from 'axios';
import routes from "../constants/routes";

export default function getCinemas() {
    const url = routes + '/cinemas';
    const response = axios.get(url);
    return response.data;
  }