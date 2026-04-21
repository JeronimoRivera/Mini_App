"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTasks = void 0;
class GetAllTasks {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(search, completed) {
        return this.taskRepository.findAll(search, completed);
    }
}
exports.GetAllTasks = GetAllTasks;
