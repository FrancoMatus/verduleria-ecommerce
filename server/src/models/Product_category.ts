import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  const Product_category = sequelize.define("Product_category", {
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });
  return Product_category;
};
