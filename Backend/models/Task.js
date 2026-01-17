const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('pending', 'completed'), defaultValue: 'pending' }
});

// Create the Relationship: One User has Many Tasks
User.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(User);

module.exports = Task;