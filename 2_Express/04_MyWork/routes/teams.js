const express = require('express');
const teamsRouter = express.Router();
var fs = require('fs');

teamsRouter.get('/', function(request, response) {
    response.end(fs.readFileSync("./data/teams.json"));
});

module.exports = teamsRouter;