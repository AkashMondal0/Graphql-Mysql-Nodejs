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
});

const Image = sequelize.define("Image", {
    postId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
});

const Comment = sequelize.define("Comment", {
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
});

const Like = sequelize.define("Like", {
    reaction: {
        type: DataTypes.BOOLEAN,
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
});

Post.belongsTo(User, { foreignKey: 'authorId' });
Like.belongsTo(User, { foreignKey: 'authorId' });
Like.belongsTo(Post, { foreignKey: 'postId' });
// Comment.belongsTo(Post, { foreignKey: 'postId' });
Comment.belongsTo(User, { foreignKey: 'authorId' });
Image.belongsTo(Post, { foreignKey: 'postId' });
Image.belongsTo(User, { foreignKey: 'authorId' });

export {
    Post,
    Like,
    Comment,
    Image
};