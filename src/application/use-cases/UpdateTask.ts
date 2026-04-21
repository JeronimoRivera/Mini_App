import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

interface UpdateTaskInput {
  title?: string;
  completed?: boolean;
}

export class UpdateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string, input: UpdateTaskInput): Promise<Task | null> {
    if (input.title !== undefined && !input.title.trim()) {
      throw new Error("Si envías title, no puede ir vacío");
    }

    return this.taskRepository.update(id, {
      ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      ...(input.completed !== undefined ? { completed: input.completed } : {}),
    });
  }
}
