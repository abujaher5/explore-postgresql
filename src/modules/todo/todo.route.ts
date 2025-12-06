import { Router } from "express";
import { todoControllers } from "./todo.controller";

const router = Router();

// routes => controller => service

// localhost:5000/todos ==> /

router.post("/", todoControllers.createTodo);

router.get("/", todoControllers.getTodo);
router.get("/:id", todoControllers.getSingleTodo);
router.put("/:id", todoControllers.updateTodo);
router.delete("/:id", todoControllers.deleteTodo);

export const todoRoutes = router;
