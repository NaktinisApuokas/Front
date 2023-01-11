import axios from 'axios';

export default function Delete(url) {
  axios.delete(url);
  window.location.reload(false);
}
