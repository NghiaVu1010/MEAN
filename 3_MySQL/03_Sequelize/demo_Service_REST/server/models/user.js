'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_name: DataTypes.STRING,
        email: DataTypes.STRING,
        is_admin: DataTypes.INTEGER,
        password: DataTypes.STRING
    }, {});
    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};