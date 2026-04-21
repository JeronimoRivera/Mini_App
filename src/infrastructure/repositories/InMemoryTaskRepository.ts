import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

/**
 * Implementación en memoria.
 * Simula una base de datos usando un arreglo local.
 */
export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [
    { id: "1", title: "Estudiar Clean Architecture", completed: false },
    { id: "2", title: "Terminar mini app de tareas", completed: true },
  ];

  async findAll(search?: string, completed?: boolean): Promise<Task[]> {
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

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) ?? null;
  }

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async update(id: string, data: Partial<Omit<Task, "id">>): Promise<Task | null> {
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

  async delete(id: string): Promise<boolean> {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks.length < initialLength;
  }
}
