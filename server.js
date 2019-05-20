const app = require("./app");
const config = require('./private/config');

app.listen(config.port, ()=>{console.log(`App listening on port ${config.port}`)})
