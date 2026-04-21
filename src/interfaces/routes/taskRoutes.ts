import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

/**
 * Las rutas solo definen endpoints y delegan en el controller.
 */
export const createTaskRouter = (taskController: TaskController): Router => {
  const router = Router();

  router.get("/tasks", taskController.getAll);
  router.get("/tasks/:id", taskController.getById);
  router.post("/tasks", taskController.create);
  router.put("/tasks/:id", taskController.update);
  router.delete("/tasks/:id", taskController.delete);

  return router;
};
