"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTask = void 0;
const crypto_1 = require("crypto");
class CreateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(input) {
        if (!input.title?.trim()) {
            throw new Error("El title es obligatorio");
        }
        const newTask = {
            id: (0, crypto_1.randomUUID)(),
            title: input.title.trim(),
            completed: input.completed ?? false,
        };
        return this.taskRepository.create(newTask);
    }
}
exports.CreateTask = CreateTask;
