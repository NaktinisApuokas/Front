import axios from 'axios';

export default function Delete(id, url) {
  axios.delete(url + id);
  window.location.reload(false);
}
