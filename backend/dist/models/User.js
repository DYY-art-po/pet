"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
        },
        openid: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'users',
        timestamps: false,
    });
    return User;
};
