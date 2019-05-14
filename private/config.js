const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  usda: {
    access_key: process.env.USDA_API_ACCESS_KEY,
    search_endpoint: process.env.USDA_SEARCH_ENDPOINT,
    reports_endpoint: process.env.USDA_REPORTS_ENDPOINT
  }
}
