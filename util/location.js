const axios = require('axios');

const HttpError = require('../models/http-error');

//const API_KEY = 'AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA';

async function getCoordsForAddress(address) {



  const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;  

  const response = await axios.get(apiUrl);


  const data = response.data[0];

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = {lat: data.lat,lng:data.lon};

  return coordinates;
}

module.exports = getCoordsForAddress;
