const userService = require("../services/userService.js");

var UC = {};

UC.postUserUpdate = (req, res) => {
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
        userService.postUserUpdate(req, res);
    }
};

module.exports = UC;