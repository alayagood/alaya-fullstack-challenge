import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL

class ApiCaller {

  constructor(client) {
    this.innerClient = client
  }
  async callApi(endpoint,
    method = 'get',
    body,
    headers = { 'content-type': 'application/json' }) {

    try {
      const response = await this.innerClient({
        url: `${API_URL}/${endpoint}`,
        method,
        headers,
        data: body
      })

      return response.data;

    } catch (error) {
      if (error.response) { // status code out of the range of 2xx
        console.log("Data :", error.response.data);
        console.log("Status :" + error.response.status);
      } else if (error.request) { // The request was made but no response was received
        console.log(error.request);
      } else {// Error on setting up the request
        console.log('Error', error.message);
      }
      // Propagate error in case we want to for example set loading to false...
      // This is also usefull to avoid returning undefined on promises , although if we dont catch them they will remain uncaught, but won't break the app.
      return Promise.reject(error)
    }
  }


}
const apiCaller = new ApiCaller(axios.create({ baseURL: API_URL }))

export default apiCaller

