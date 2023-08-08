import { DataTypes } from 'sequelize';
import sequelize from '../db';

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})
export {
    Post,
};