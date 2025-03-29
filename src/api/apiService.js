import axios from "axios";

const env = import.meta.env;
const apiBase = env.VITE_API_BASE_URL;

const searchPlacesApiGateway = axios.create({
  baseURL: apiBase,
  timeout: 20000,
  headers: {
		'x-rapidapi-key': env.VITE_RAPID_API_KEY,
		'x-rapidapi-host': env.VITE_RAPID_API_HOST
	}
});

searchPlacesApiGateway.interceptors.response.use((res) => {
  return res;
});
searchPlacesApiGateway.interceptors.request.use((config) => {
  return config;
});

export default searchPlacesApiGateway;
