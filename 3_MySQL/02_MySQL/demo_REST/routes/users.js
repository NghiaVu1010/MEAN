var express = require('express');
var userRouter = express.Router();

var dbConn = require('./../inc/db_connection');
var dbQuery = require('./../inc/db_queries');

// GET: http://localhost:3000/users/
userRouter.get('/', function(req, res) {
    dbConn.getDbConnection(dbQuery.getAllUsers, req, res);
});

// register
// POST: http://localhost:3000/users/register/
userRouter.post('/register/', function(req, res) {
    var userName = req.body.user_name;
    var userPassword = req.body.user_password;
    var userEmail = req.body.user_email;
    if (userName == null || userName == '' || 
        userPassword == null || userPassword == '' || 
        userEmail == null || userEmail == '') {
        res.json({
            'success': false,
            'msg': 'Bad Input: Missing login data.'
        });
    } else {
        dbConn.getDbConnection(dbQuery.postUserRegister, req, res);
    }
});

// login
// POST: http://localhost:3000/users/login/
userRouter.post('/login/', function(req, res) {
    var userName = req.body.user_name;
    var userPassword = req.body.user_password;
    if (userName == null || userName == '' || userPassword == null || userPassword == '') {
        res.json({
            'success': false,
            'msg': 'Bad Input: Missing login data.'
        });
    } else {
        dbConn.getDbConnection(dbQuery.postUserLogin, req, res);
    }
});

// update
// PUT: http://localhost:3000/users/
userRouter.put('/', function(req, res) {
    var userName = req.body.user_name;
    var userPassword = req.body.user_password;
    var userEmail = req.body.user_email;
    if (userName == null || userName == '' || 
        userPassword == null || userPassword == '' || 
        userEmail == null || userEmail == '') {
        res.json({
            'success': false,
            'msg': 'Bad Input: Missing login data.'
        });
    } else {
        dbConn.getDbConnection(dbQuery.postUserUpdate, req, res);
    }
});

/* Cool single type way
userRouter.put('/:user_id', function(req, res) {
    var userId = req.params.user_id;
    var update_type = req.body.update_type;
    var update_value = req.body.update_value;
    if (userId == null || userId == '' || 
        update_type == null || update_type == '' || 
        update_value == null || update_value == '') {
        res.json({
            'success': false,
            'msg': 'Bad Input: Missing login data.'
        });
    } else {
        dbConn.getDbConnection(dbQuery.postUserUpdate, req, res);
    }
});
*/

// delete
// DELETE: http://localhost:3000/users/{user_id}
userRouter.delete('/:user_id', function(req, res) {
    var userId = req.params.user_id;

    if (userId == null || userId == '') {
        res.json({
            'success': false,
            'msg': 'Bad Input: Missing login data.'
        });
    } else {
        dbConn.getDbConnection(dbQuery.deleteUser, req, res);
    }
});

module.exports = userRouter;