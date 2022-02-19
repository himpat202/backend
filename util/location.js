// const axios = require('axios');

// const HttpError = require('../models/http-error');

// const API_KEY = 'AIzaSyCsRE11cz94JV1s6l1CL_lZBuBUXcu30SE';

// // AIzaSyAmi_VgHCrSHwS7g6Dx2yJMsivxswEh87s
// async function getCoordsForAddress(address) {
//   // return {
//   //   lat: 40.7484474,
//   //   lng: -73.9871516
//   // };
//   const response = await axios.get(
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       address
//     )}&key=${API_KEY}`
//   );

//   const data = response.data;

//   if (!data || data.status === 'ZERO_RESULTS') {
//     const error = new HttpError(
//       'Could not find location for the specified address.',
//       422
//     );
//     throw error;
//   }

//   const coorLat = data.lat;
//   const coorLon = data.lon;
//   const coordinates = {
//     lat: coorLat,
//     lng: coorLon
//   };
 
//   return coordinates;


//   //return coordinates;
// }

// module.exports = getCoordsForAddress;

const axios = require('axios');
 
const HttpError = require('../models/http-error');
 
const getCoordsForAddress = async (address) => {
  const response = await axios.get(
    'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates',
    {
      params: {
        f: 'json',
        singleLine: address,
        outFields: 'Match_addr,Addr_type'
      }
    }
  );
 
  const data = response.data;
 
  // Check if no matches were found
  if (!data || data.candidates.length === 0) {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }
 
  // Get Latitude
  const lat = response.data.candidates[0].location.y;
  // Get Longitude
  const lng = response.data.candidates[0].location.x;
 
  return {
    lat,
    lng
  };
};
 
module.exports = getCoordsForAddress;
