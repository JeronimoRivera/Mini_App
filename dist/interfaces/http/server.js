"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CreateTask_1 = require("../../application/use-cases/CreateTask");
const DeleteTask_1 = require("../../application/use-cases/DeleteTask");
const GetAllTasks_1 = require("../../application/use-cases/GetAllTasks");
const GetTaskById_1 = require("../../application/use-cases/GetTaskById");
const UpdateTask_1 = require("../../application/use-cases/UpdateTask");
const InMemoryTaskRepository_1 = require("../../infrastructure/repositories/InMemoryTaskRepository");
const TaskController_1 = require("../controllers/TaskController");
const taskRoutes_1 = require("../routes/taskRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Infrastructure
const taskRepository = new InMemoryTaskRepository_1.InMemoryTaskRepository();
// Application
const getAllTasks = new GetAllTasks_1.GetAllTasks(taskRepository);
const getTaskById = new GetTaskById_1.GetTaskById(taskRepository);
const createTask = new CreateTask_1.CreateTask(taskRepository);
const updateTask = new UpdateTask_1.UpdateTask(taskRepository);
const deleteTask = new DeleteTask_1.DeleteTask(taskRepository);
// Interfaces
const taskController = new TaskController_1.TaskController(getAllTasks, getTaskById, createTask, updateTask, deleteTask);
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
app.use((0, taskRoutes_1.createTaskRouter)(taskController));
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ API ejecutándose en http://localhost:${PORT}`);
});
