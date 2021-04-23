const { User } = require("../db.js");
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces/UserInterface";
import { userSchemaBody } from "../libs/joiSchemas";

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body);
    const {
      username,
      firstName,
      lastName,
      email,
      phone,
      password,
      isAdmin,
    } = req.body;

    const { error } = userSchemaBody.validate(req.body);

    if (error) {
      res.status(400).json(error.details[0].message);
      return;
    }

    const userAlreadyExists: object = await User.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      console.log(userAlreadyExists);
      res
        .status(400)
        .json("El correo se encuentra registrado. Intente nuevamente.");
      return;
    }

    const user: UserInterface = await User.create({
      username,
      firstName,
      lastName,
      email,
      phone,
      password,
      isAdmin,
    });

    user.password = await user.encryptPassword(password);

    const { password: passwordUpdated } = user;

    const savedUser = await user.update(
      {
        password: passwordUpdated,
      },
      {
        where: { email },
      }
    );

    const {
      id,
      username: usernameRegistered,
      firstName: firstNameRegistered,
      lastName: lastNameRegistered,
      email: emailRegistered,
      phone: phoneRegistered,
      isAdmin: isAdminRegistered,
    } = savedUser;

    const token: string = jwt.sign(
      { id, savedUser: id },
      process.env.GENERATE_SECRET_KEY_TOKEN || "TRASH_TOKEN"
    );

    const responseApiRegister: object = {
      id,
      username: usernameRegistered,
      firstName: firstNameRegistered,
      lastName: lastNameRegistered,
      email: emailRegistered,
      phone: phoneRegistered,
      isAdmin: isAdminRegistered,
      token,
    };

    res.header("auth-token", token).json(responseApiRegister);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
    return;
  }
};

export const signIn = async (req: Request, res: Response): Promise<any> => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;

    const userValidateLogin = await User.findOne({
      where: {
        email,
      },
    });
    console.log(userValidateLogin);
    if (!userValidateLogin) {
      res.status(400).json("Correo o contraseña incorrecto(s).");
      return;
    }

    const correctPassword = await userValidateLogin.validatePassword(password);

    if (!correctPassword) {
      res.status(400).json("Contraseña incorrecta");
      return;
    }
    const {
      id,
      dataValues: {
        username: usernameLoggedIn,
        firstName: firstNameLoggedIn,
        lastName: lastNameLoggedIn,
        email: emailLoggedIn,
        phone: phoneLoggedIn,
        isAdmin: isAdminLoggedIn,
      },
    } = await User.findOne({
      where: { email },
    });
    const token: string = jwt.sign(
      { id },
      process.env.GENERATE_SECRET_KEY_TOKEN || "TRASH_TOKEN",
      {
        expiresIn: 60 * 60 * 24 * 365,
      }
    );

    const responseApiLogin: object = {
      id,
      username: usernameLoggedIn,
      firstName: firstNameLoggedIn,
      lastName: lastNameLoggedIn,
      email: emailLoggedIn,
      phone: phoneLoggedIn,
      isAdmin: isAdminLoggedIn,
      token,
    };

    res.header("auth-token", token).json(responseApiLogin);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
    return;
  }
};

export const profile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req;
    const {
      dataValues: { id, username, firstName, lastName, phone, email, isAdmin },
    } = await User.findOne({
      where: { id: userId },
    });
    if (!id) {
      res.status(404).json("Usuario no encontrado.");
      return;
    }

    const userProfileData = {
      id,
      username,
      firstName,
      lastName,
      phone,
      email,
      isAdmin,
    };

    res.status(200).json(userProfileData);
  } catch (e) {
    res.status(400).json(e);
    return;
  }
};
