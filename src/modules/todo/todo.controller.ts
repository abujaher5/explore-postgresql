import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.createTodo(req.body);
    // console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "Todo Created Successfully.",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodo();
    res.status(200).json({
      success: true,
      message: "Todos retrieved successfully.",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getSingleTodo(req.params.id as string);
    console.log(result);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Single todo fetched successfully..",
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
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.updateTodo(req.body, req.params.id!);
    // console.log(result);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo Updated Successfully..",
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
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deleteTodo(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo Deleted Successfully..",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const todoControllers = {
  createTodo,
  getTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
