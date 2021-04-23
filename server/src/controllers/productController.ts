const { Product, Category } = require("../db.js");
import { Request, Response } from "express";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const allProducts = await Product.findAll({});

    const newProducts = allProducts.map(async (product: any) => {
      const mapCategories = await product.getCategories();
      const newMapCategories = mapCategories?.map((category: any) => {
        const {
          dataValues: { name },
        } = category || { dataValues: { name: "" } };
        return name;
      });
      await product.setDataValue("categories", [...newMapCategories]);
      const { dataValues: oneProduct } = product;
      return {
        ...oneProduct,
        categories: await product.getDataValue("categories"),
      };
    });
    if (!allProducts.length) {
      res.status(400).json("No hay comidas disponibles en este momento.");
    }
    const allProductsResponse = await Promise.all(newProducts);
    res.status(200).json(allProductsResponse);
  } catch (e) {
    res.status(400).json(e);
    return;
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    body: { name, description, stock, price, categories = [] },
  } = req;
  const newProductBody = {
    name,
    description,
    stock,
    price,
  };

  const newProductResponse = await Product.create(newProductBody);

  if (!newProductResponse) {
    res.status(400).json("Hubo un error al crear el producto.");
  }

  const promiseCategoriesForProduct = categories.map(async (category: any) => {
    const categoryId = await Category.findOne({
      where: {
        name: category,
      },
    });
    if (categoryId) {
      const { id } = categoryId;
      return id;
    }
  });

  const categoriesForProduct = await Promise.all(promiseCategoriesForProduct);

  const newCategoriesForProduct = categoriesForProduct?.map(
    async (category: any) => {
      await newProductResponse.addCategory(category);
    }
  );

  await Promise.all(newCategoriesForProduct);
  const mapCategories = await newProductResponse.getCategories();
  const newMapCategories = mapCategories.map((category: any) => {
    const {
      dataValues: { name },
    } = category || { dataValues: { name: "" } };
    return name;
  });
  await newProductResponse.setDataValue("categories", [...newMapCategories]);

  const { dataValues: bodyProduct } = newProductResponse;

  const productBody = {
    ...bodyProduct,
    categories: await newProductResponse.getDataValue("categories"),
  };

  res.status(200).json(productBody);

  try {
  } catch (e) {
    res.status(400).json(e);
    return;
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (e) {
    res.status(400).json(e);
    return;
  }
};
