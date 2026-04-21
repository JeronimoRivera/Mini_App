/**
 * Entidad central del dominio.
 * Representa una tarea dentro de la aplicación.
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}
