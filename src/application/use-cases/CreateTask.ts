import { randomUUID } from "crypto";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

interface CreateTaskInput {
  title: string;
  completed?: boolean;
}

export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: CreateTaskInput): Promise<Task> {
    if (!input.title?.trim()) {
      throw new Error("El title es obligatorio");
    }

    const newTask: Task = {
      id: randomUUID(),
      title: input.title.trim(),
      completed: input.completed ?? false,
    };

    return this.taskRepository.create(newTask);
  }
}
