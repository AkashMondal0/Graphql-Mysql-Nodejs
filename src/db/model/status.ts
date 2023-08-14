import { DataTypes } from 'sequelize';
import sequelize from '../db';
import { User } from './User';

const Status = sequelize.define("Status", {
    caption: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
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
    },
    statusSeen:{
        type: DataTypes.JSON,
        allowNull: true,
    }
})

Status.belongsTo(User, { foreignKey: 'authorId' });
Status.hasMany(User, { foreignKey: 'id' });

export {
    Status,
};