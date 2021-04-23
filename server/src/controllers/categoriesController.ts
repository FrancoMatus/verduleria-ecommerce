const { Category } = require("../db.js");
import { Request, Response } from "express";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const allCategories = await Category.findAll({});
    if (!allCategories.length) {
      res.status(400).json("No hay comidas disponibles en este momento.");
    }

    res.status(200).json(allCategories);
  } catch (e) {
    res.status(400).json(e);
    return;
  }
};

export const createCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      body: { name },
    } = req;

    const newCategoryBody = {
      name,
    };

    const newCategoryResponse = await Category.create(newCategoryBody);
    if (!newCategoryResponse) {
      res.status(400).json("No se ha podido crear la categoría");
      return;
    }
    res.status(200).json(newCategoryResponse);
  } catch (error) {
    res.status(400).json(error);
  }
};
