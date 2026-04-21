import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class DeleteTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.taskRepository.delete(id);
  }
}
