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
})

const StatusSeen = sequelize.define("StatusSeen", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    statusId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Status.belongsTo(User, { foreignKey: 'authorId' });
Status.hasMany(User, { foreignKey: 'id' });

export {
    Status,
    StatusSeen
};