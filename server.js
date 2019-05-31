const app = require("./app");
const dotenvLoad = require('dotenv-load');

dotenvLoad();
var port = process.env.PORT;

app.listen(port);