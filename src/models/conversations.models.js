const { DataTypes } = require("sequelize");

const db = require("../utils/database");
//const Users = require("./users.models");

const Conversations = db.define("conversations", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage:{
    type: DataTypes.STRING
  },
  isGroup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Conversations