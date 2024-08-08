import axios from 'axios';
import store from '@/store/main.js';

const api = {
  async uploadImage(url) {
    let response_json = {
      status: 'error',
      err_description: ''
    };

    try {
      const host = store.api_url;
    
      const headers = {};
      const q = `?url=${url}`

      const request = await axios.post(`${host}/upload_image/${q}`, { headers });
      const response = await request.data;

      response_json = { ...response };
    } catch (error) {
      response_json.err_description = error.message;
    }

    return response_json;
  }
}

export default api;