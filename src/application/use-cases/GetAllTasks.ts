import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class GetAllTasks {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(search?: string, completed?: boolean): Promise<Task[]> {
    return this.taskRepository.findAll(search, completed);
  }
}
