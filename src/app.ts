import express, { Request, Response } from "express";

import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.route";
import { todoRoutes } from "./modules/todo/todo.route";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

// parser
app.use(express.json());
// app.use(express.urlencoded())

// initialing database

initDB();

// -------LOGGER MIDDLEWARE ----

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World Next Level Developer...");
});

//  ROUTES => CONTROLLER=> SERVICE

// -----------USERS CRUD -------------
app.use("/users", userRoutes);

// --------TODOS CRUD ------------

app.use("/todos", todoRoutes);

// ------AUTH ROUTES----
app.use("/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found..",
    path: req.path,
  });
});

export default app;
