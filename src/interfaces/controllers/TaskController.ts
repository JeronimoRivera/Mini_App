import { Request, Response } from "express";
import { CreateTask } from "../../application/use-cases/CreateTask";
import { DeleteTask } from "../../application/use-cases/DeleteTask";
import { GetAllTasks } from "../../application/use-cases/GetAllTasks";
import { GetTaskById } from "../../application/use-cases/GetTaskById";
import { UpdateTask } from "../../application/use-cases/UpdateTask";

/**
 * El controller traduce HTTP -> casos de uso.
 * Aquí se leen params, query y body; luego se responde con status y JSON.
 */
export class TaskController {
  constructor(
    private readonly getAllTasks: GetAllTasks,
    private readonly getTaskById: GetTaskById,
    private readonly createTask: CreateTask,
    private readonly updateTask: UpdateTask,
    private readonly deleteTask: DeleteTask
  ) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // Ejemplo de query params: GET /tasks?search=estudiar&completed=false
      const search = typeof req.query.search === "string" ? req.query.search : undefined;
      const completed =
        typeof req.query.completed === "string"
          ? req.query.completed === "true"
          : undefined;

      const tasks = await this.getAllTasks.execute(search, completed);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener tareas", error });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      // Ejemplo de param: GET /tasks/1 -> req.params.id = "1"
      const { id } = req.params;
      const task = await this.getTaskById.execute(id);

      if (!task) {
        res.status(404).json({ message: "Tarea no encontrada" });
        return;
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la tarea", error });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, completed } = req.body;
      const task = await this.createTask.execute({ title, completed });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Error al crear tarea" });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      const updatedTask = await this.updateTask.execute(id, { title, completed });

      if (!updatedTask) {
        res.status(404).json({ message: "Tarea no encontrada" });
        return;
      }

      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Error al actualizar tarea" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.deleteTask.execute(id);

      if (!deleted) {
        res.status(404).json({ message: "Tarea no encontrada" });
        return;
      }

      res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar tarea", error });
    }
  };
}
