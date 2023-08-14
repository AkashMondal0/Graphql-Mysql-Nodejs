import { DataTypes } from 'sequelize';
import sequelize from '../db';
import { User } from './User';

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: true
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false
    },
    authorId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});

const PostComment = sequelize.define("PostComment", {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    
});

Post.belongsTo(User, { foreignKey: 'authorId' });
PostComment.belongsTo(User, { foreignKey: 'authorId' });
// PostComment.belongsTo(Post, { foreignKey: 'postId' });

export {
    Post,
    PostComment
};