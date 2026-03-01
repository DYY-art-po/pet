"use strict";
module.exports = (sequelize, DataTypes) => {
    const Friendship = sequelize.define('Friendship', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pets',
                key: 'id',
            },
        },
        friend_pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pets',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted'),
            defaultValue: 'pending',
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'friendships',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['pet_id', 'friend_pet_id'],
            },
        ],
    });
    return Friendship;
};
