import express from "express";
import { CreateTask } from "../../application/use-cases/CreateTask";
import { DeleteTask } from "../../application/use-cases/DeleteTask";
import { GetAllTasks } from "../../application/use-cases/GetAllTasks";
import { GetTaskById } from "../../application/use-cases/GetTaskById";
import { UpdateTask } from "../../application/use-cases/UpdateTask";
import { InMemoryTaskRepository } from "../../infrastructure/repositories/InMemoryTaskRepository";
import { TaskController } from "../controllers/TaskController";
import { createTaskRouter } from "../routes/taskRoutes";

const app = express();
app.use(express.json());

// Infrastructure
const taskRepository = new InMemoryTaskRepository();

// Application
const getAllTasks = new GetAllTasks(taskRepository);
const getTaskById = new GetTaskById(taskRepository);
const createTask = new CreateTask(taskRepository);
const updateTask = new UpdateTask(taskRepository);
const deleteTask = new DeleteTask(taskRepository);

// Interfaces
const taskController = new TaskController(
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
);

app.get("/", (_req, res) => {
  res.json({
    message: "API REST de tasks con Clean Architecture funcionando",
    endpoints: [
      "GET /tasks",
      "GET /tasks/:id",
      "POST /tasks",
      "PUT /tasks/:id",
      "DELETE /tasks/:id"
    ]
  });
});

app.use(createTaskRouter(taskController));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ API ejecutándose en http://localhost:${PORT}`);
});
