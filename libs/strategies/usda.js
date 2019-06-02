const usdaStrategy= {
  search(foodString, offset=0, max=100) {
    return `${process.env.USDA_URL+process.env.USDA_SEARCH_ENDPOINT}?format=json&q=${foodString}&max=${max}&offset=${offset}&api_key=${process.env.USDA_API_ACCESS_KEY}`;
  },
  getContent(ndbno){
    return `${process.env.USDA_URL+process.env.USDA_REPORTS_ENDPOINT}?ndbno=${ndbno}&type=f&format=json&api_key=${process.env.USDA_API_ACCESS_KEY}`
  }

}

module.exports = usdaStrategy;