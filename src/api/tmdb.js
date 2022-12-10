import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const base_url = process.env.REACT_APP_END_POINT;

const tmbd = axios.create({
  baseURL: base_url,
  params: {
    api_key: API_KEY,
  },
});

export default tmbd;
