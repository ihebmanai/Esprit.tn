import axios from 'axios';
const api = axios.create({
  baseURL: `http://localhost:4000/api/`
});
api.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");

  if ( token != null ) {
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
    config.headers = headers;
  }

  return config;
}, function (err) {
    console.log('teset'+err)
  return Promise.reject(err);
});

export default api ;
