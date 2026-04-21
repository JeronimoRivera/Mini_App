"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
/**
 * El controller traduce HTTP -> casos de uso.
 * Aquí se leen params, query y body; luego se responde con status y JSON.
 */
class TaskController {
    constructor(getAllTasks, getTaskById, createTask, updateTask, deleteTask) {
        this.getAllTasks = getAllTasks;
        this.getTaskById = getTaskById;
        this.createTask = createTask;
        this.updateTask = updateTask;
        this.deleteTask = deleteTask;
        this.getAll = async (req, res) => {
            try {
                // Ejemplo de query params: GET /tasks?search=estudiar&completed=false
                const search = typeof req.query.search === "string" ? req.query.search : undefined;
                const completed = typeof req.query.completed === "string"
                    ? req.query.completed === "true"
                    : undefined;
                const tasks = await this.getAllTasks.execute(search, completed);
                res.status(200).json(tasks);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener tareas", error });
            }
        };
        this.getById = async (req, res) => {
            try {
                // Ejemplo de param: GET /tasks/1 -> req.params.id = "1"
                const { id } = req.params;
                const task = await this.getTaskById.execute(id);
                if (!task) {
                    res.status(404).json({ message: "Tarea no encontrada" });
                    return;
                }
                res.status(200).json(task);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener la tarea", error });
            }
        };
        this.create = async (req, res) => {
            try {
                const { title, completed } = req.body;
                const task = await this.createTask.execute({ title, completed });
                res.status(201).json(task);
            }
            catch (error) {
                res.status(400).json({ message: error instanceof Error ? error.message : "Error al crear tarea" });
            }
        };
        this.update = async (req, res) => {
            try {
                const { id } = req.params;
                const { title, completed } = req.body;
                const updatedTask = await this.updateTask.execute(id, { title, completed });
                if (!updatedTask) {
                    res.status(404).json({ message: "Tarea no encontrada" });
                    return;
                }
                res.status(200).json(updatedTask);
            }
            catch (error) {
                res.status(400).json({ message: error instanceof Error ? error.message : "Error al actualizar tarea" });
            }
        };
        this.delete = async (req, res) => {
            try {
                const { id } = req.params;
                const deleted = await this.deleteTask.execute(id);
                if (!deleted) {
                    res.status(404).json({ message: "Tarea no encontrada" });
                    return;
                }
                res.status(200).json({ message: "Tarea eliminada correctamente" });
            }
            catch (error) {
                res.status(500).json({ message: "Error al eliminar tarea", error });
            }
        };
    }
}
exports.TaskController = TaskController;
