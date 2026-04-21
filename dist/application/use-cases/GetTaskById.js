"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTaskById = void 0;
class GetTaskById {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(id) {
        return this.taskRepository.findById(id);
    }
}
exports.GetTaskById = GetTaskById;
