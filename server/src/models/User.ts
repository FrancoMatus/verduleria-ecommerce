import { DataTypes } from "sequelize";
const bcrypt = require("bcrypt");

module.exports = (sequelize: any) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING(16),
    },
    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(126),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: "false",
    },
    password: {
      type: DataTypes.STRING(256),
      required: true,
    },
  });
  User.prototype.encryptPassword = async function (
    password: string
  ): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };

  User.prototype.validatePassword = async function (
    password: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};
