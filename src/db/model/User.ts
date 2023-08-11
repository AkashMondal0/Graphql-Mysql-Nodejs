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
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
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
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    followerId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'followerId',
    },
    followingId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'followingId',
    },
})
// Define the foreign key relationships
Follow.belongsTo(User, { foreignKey: 'followerId' });
Follow.belongsTo(User, { foreignKey: 'followingId' });
export {
    User,
    Follow
};