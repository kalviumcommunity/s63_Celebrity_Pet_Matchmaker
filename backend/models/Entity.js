const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

const Entity = sequelize.define('Entity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    }
});

Entity.belongsTo(User, { foreignKey: 'created_by' });

module.exports = Entity;
