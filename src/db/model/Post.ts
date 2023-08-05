import { DataTypes } from 'sequelize';
import sequelize from '../db';
import { User } from './User';

const Post = sequelize.define("Post", {
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
        field: 'authorId',
        references: {
            model: User,
            key: 'uid'
        }
    },
});

const Comment = sequelize.define("Comment", {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'userId',
        references: {
            model: User,
            key: 'uid'
        }
    },
    postId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'postId',
        references: {
            model: Post,
            key: 'id'
        }
    },
});

const Like = sequelize.define("Like", {
    reaction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'userId',
        references: {
            model: User,
            key: 'uid'
        }
    },
    postId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'postId',
        references: {
            model: Post,
            key: 'id'
        }
    },
});




export {
    Post,
    Like,
    Comment
};