const express = require('express');
const leaguesRouter = express.Router();
var fs = require('fs');

leaguesRouter.get('/', function(request, response) {
    response.end(fs.readFileSync("./data/leagues.json"));
});

module.exports = leaguesRouter;