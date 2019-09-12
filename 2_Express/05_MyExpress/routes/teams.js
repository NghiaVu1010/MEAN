const express = require('express');
const teamsRouter = express.Router();
var fs = require('fs');

teamsRouter.get('/', function(request, response) {
    response.render('teams', { title: 'Teams' });
});

teamsRouter.get('/data', function(request, response) {
    try{
        response.end(fs.readFileSync("./data/teams.json"));
    }
    catch(err) {
        response.end("[]");
    }
});

module.exports = teamsRouter;