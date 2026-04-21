"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryTaskRepository = void 0;
/**
 * Implementación en memoria.
 * Simula una base de datos usando un arreglo local.
 */
class InMemoryTaskRepository {
    constructor() {
        this.tasks = [
            { id: "1", title: "Estudiar Clean Architecture", completed: false },
            { id: "2", title: "Terminar mini app de tareas", completed: true },
        ];
    }
    async findAll(search, completed) {
        let result = this.tasks;
        if (search?.trim()) {
            const term = search.trim().toLowerCase();
            result = result.filter((task) => task.title.toLowerCase().includes(term));
        }
        if (typeof completed === "boolean") {
            result = result.filter((task) => task.completed === completed);
        }
        return result;
    }
    async findById(id) {
        return this.tasks.find((task) => task.id === id) ?? null;
    }
    async create(task) {
        this.tasks.push(task);
        return task;
    }
    async update(id, data) {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index === -1) {
            return null;
        }
        this.tasks[index] = {
            ...this.tasks[index],
            ...data,
        };
        return this.tasks[index];
    }
    async delete(id) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter((task) => task.id !== id);
        return this.tasks.length < initialLength;
    }
}
exports.InMemoryTaskRepository = InMemoryTaskRepository;
