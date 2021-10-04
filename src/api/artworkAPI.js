import axios from 'axios';

export default {
  async getConfig() {
    let ret = {};
    const api = 'https://api.artic.edu/api/v1/artworks?limit=0&fields=id';
    const { data } = await axios.get(api);

    ret = data;

    return ret;
  },
  async getArtworks(page = 1, keyword, listRows) {
    let ret = {};
    const apiQueryObj = {
      limit: listRows,
      fields: ['id', 'title', 'image_id', 'artist_display'],
    };
    if (keyword) {
      apiQueryObj.params = JSON.stringify({ q: keyword });
    }
    if (page) {
      apiQueryObj.page = page;
    }

    const expandUrl = new URLSearchParams(apiQueryObj).toString();
    const apiUrl = keyword
      ? `https://api.artic.edu/api/v1/artworks/search?${expandUrl}`
      : `https://api.artic.edu/api/v1/artworks?${expandUrl}`;

    const { data } = await axios.get(apiUrl);

    ret = data;

    return ret;
  },
};
