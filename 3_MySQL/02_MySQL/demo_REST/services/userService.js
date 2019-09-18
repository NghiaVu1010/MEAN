const dbConn = require('./../inc/db_connection');
const dbQuery = require('./../inc/db_queries');

var US = {};

US.postUserUpdate = (req, res) => {
    dbConn.getDbConnection(dbQuery.postUserUpdate, req, res);
};

module.exports = US;