import express, { Application } from "express";
import authRoutes from "./routes/auth";
import foodRoutes from "./routes/product";
import categoriesRoutes from './routes/categories'
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
const { REACT_APP_URL } = process.env;

const app: Application = express();

// middlewares
app.use(urlencoded({ extended: true, limit: "50mb" }));
app.use(json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// CORS OPTIONS (CROSS-ORIGIN)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${REACT_APP_URL}`);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth-token"
  );
  res.header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
  next();
});
// Routes
const corsOptions = {
  origin: `${REACT_APP_URL}`,
};
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/products", foodRoutes);
app.use("/api/categories", categoriesRoutes);

export default app;
