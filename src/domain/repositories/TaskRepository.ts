import { Task } from "../entities/Task";

/**
 * Contrato del repositorio.
 * El dominio solo conoce la forma de guardar/consultar tareas,
 * pero no sabe si vienen de memoria, SQL, Mongo, etc.
 */
export interface TaskRepository {
  findAll(search?: string, completed?: boolean): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(id: string, data: Partial<Omit<Task, "id">>): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
}
