import { DataTypes } from 'sequelize';
import sequelize from '../db';

const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

const Follow = sequelize.define("follow", {
    followerId: {
        type: DataTypes.STRING,
        allowNull: false,
        // field: 'followerId',
        // references: {
        //     model: User,
        //     key: 'uid'
        // }
    },
    followingId: {
        type: DataTypes.STRING,
        allowNull: false,
        // field: 'followingId',
        // references: {
        //     model: User,
        //     key: 'uid'
        // }
    },
});

export  {
    User,
    Follow
};