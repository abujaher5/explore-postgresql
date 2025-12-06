import express, { NextFunction, Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.route";
import { todoRoutes } from "./modules/todo/todo.route";

const app = express();
const port = config.port;

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

// app.get("/todos", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`
//     SELECT * FROM todos
//     `);
//     res.status(200).json({
//       success: true,
//       message: "Todos retrieved successfully.",
//       data: result.rows,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

// app.post("/todos", async (req: Request, res: Response) => {
//   const { user_id, title } = req.body;
//   try {
//     const result = await pool.query(
//       `INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,
//       [user_id, title]
//     );
//     console.log(result.rows[0]);
//     res.status(201).json({
//       success: true,
//       message: "Todo created.",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

// update todos
app.put("/todos/:id", async (req: Request, res: Response) => {
  console.log(req.params.id);
  const { title } = req.body;
  try {
    const result = await pool.query(
      ` UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`,
      [title, req.params.id]
    );
    console.log(result);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todos not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todos Updated Successfully..",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
});

// delete todos
// app.delete("/todos/:id", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(` DELETE FROM todos WHERE id =$1`, [
//       req.params.id,
//     ]);

//     if (result.rowCount === 0) {
//       res.status(404).json({
//         success: false,
//         message: "Todos not found.",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "Todos Deleted Successfully..",
//         data: result.rows,
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found..",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
