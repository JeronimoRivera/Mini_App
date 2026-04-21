"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTask = void 0;
class UpdateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(id, input) {
        if (input.title !== undefined && !input.title.trim()) {
            throw new Error("Si envías title, no puede ir vacío");
        }
        return this.taskRepository.update(id, {
            ...(input.title !== undefined ? { title: input.title.trim() } : {}),
            ...(input.completed !== undefined ? { completed: input.completed } : {}),
        });
    }
}
exports.UpdateTask = UpdateTask;
