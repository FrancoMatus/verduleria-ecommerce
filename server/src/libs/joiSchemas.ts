import Joi from "joi";

const schemaFile = Joi.object({
  path: Joi.string().required(),
  fieldname: Joi.string().allow("", null),
  originalname: Joi.string().allow("", null),
  encoding: Joi.string().allow("", null),
  mimetype: Joi.string().allow("", null),
  destination: Joi.string().allow("", null),
  filename: Joi.string().allow("", null),
  size: Joi.any(),
});

// USER SCHEMAS

const userSchemaBody = Joi.object({
  username: Joi.string().min(3).max(16).required(),
  firstName: Joi.string().min(3).max(32).required(),
  lastName: Joi.string().min(3).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  phone: Joi.string().min(8).max(30).required(),
  isAdmin: Joi.bool().required(),
});

// USER EDIT PROFILE SCHEMA

const userEditSchemaBody = Joi.object({
  username: Joi.string().min(3).max(16).allow("", null),
  firstName: Joi.string().min(3).max(32).allow("", null),
  lastName: Joi.string().min(3).max(32).allow("", null),
  email: Joi.string().email().allow("", null),
});

export { schemaFile, userSchemaBody, userEditSchemaBody };
