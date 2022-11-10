import { Sequelize } from "sequelize";
import db from "../models/index.js";

const { DataTypes } = Sequelize;

const Users = db.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
},
{
    freezeTableName: true
});

export default Users;
