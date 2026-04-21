# API REST de Tasks con Clean Architecture

Este proyecto conserva la mini app original en **Next.js** y además agrega una **API REST en Node.js + Express + TypeScript** usando **Clean Architecture**.

## Estructura de carpetas

```bash
src/
├── domain/
│   ├── entities/
│   │   └── Task.ts
│   └── repositories/
│       └── TaskRepository.ts
├── application/
│   └── use-cases/
│       ├── CreateTask.ts
│       ├── DeleteTask.ts
│       ├── GetAllTasks.ts
│       ├── GetTaskById.ts
│       └── UpdateTask.ts
├── infrastructure/
│   └── repositories/
│       └── InMemoryTaskRepository.ts
└── interfaces/
    ├── controllers/
    │   └── TaskController.ts
    ├── routes/
    │   └── taskRoutes.ts
    └── http/
        └── server.ts
```

## Qué va en cada capa

### 1. domain
Contiene las reglas más puras del negocio:
- **entities**: modelos centrales del sistema, como `Task`
- **repositories**: contratos o interfaces que dicen qué operaciones existen

### 2. application
Contiene los **casos de uso**:
- obtener tareas
- obtener tarea por id
- crear tarea
- actualizar tarea
- eliminar tarea

Aquí va la lógica de aplicación, pero sin depender de Express ni de una base de datos concreta.

### 3. infrastructure
Aquí va la implementación técnica.
En este caso se usa `InMemoryTaskRepository`, que simula la base de datos con un arreglo en memoria.

### 4. interfaces
Es la capa que habla con el exterior:
- **controllers**: manejan `req` y `res`
- **routes**: definen endpoints
- **http**: arranca el servidor Express

## Flujo completo: request -> response

1. El cliente envía una petición, por ejemplo `GET /tasks/1`
2. La **route** detecta el endpoint correcto
3. La route llama al **controller**
4. El controller toma `params`, `query` o `body`
5. El controller ejecuta un **caso de uso**
6. El caso de uso usa el **repositorio** definido por contrato
7. La implementación real del repositorio está en **infrastructure**
8. El resultado vuelve al controller
9. El controller responde con `status` + `json`

## Endpoints

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## Params y query params

### Params
Van dentro de la URL y normalmente identifican un recurso.

Ejemplo:
```bash
GET /tasks/1
```
Aquí `1` es un **param**, y en Express se lee con:
```ts
req.params.id
```

### Query params
Van después de `?` y sirven para filtros o búsquedas.

Ejemplo:
```bash
GET /tasks?search=estudiar&completed=false
```
En Express se leen con:
```ts
req.query.search
req.query.completed
```

## Cómo ejecutar la API

Instala dependencias:
```bash
npm install
```

Ejecuta la API en desarrollo:
```bash
npm run dev:api
```

La API quedará en:
```bash
http://localhost:3001
```

## Probar con Postman

### 1. Obtener todas
- Método: `GET`
- URL: `http://localhost:3001/tasks`

### 2. Obtener por id
- Método: `GET`
- URL: `http://localhost:3001/tasks/1`

### 3. Crear tarea
- Método: `POST`
- URL: `http://localhost:3001/tasks`
- Body -> raw -> JSON:
```json
{
  "title": "Preparar entrega",
  "completed": false
}
```

### 4. Actualizar tarea
- Método: `PUT`
- URL: `http://localhost:3001/tasks/1`
- Body -> raw -> JSON:
```json
{
  "title": "Preparar entrega final",
  "completed": true
}
```

### 5. Eliminar tarea
- Método: `DELETE`
- URL: `http://localhost:3001/tasks/1`

## Probar con curl

### Obtener todas
```bash
curl http://localhost:3001/tasks
```

### Obtener por id
```bash
curl http://localhost:3001/tasks/1
```

### Buscar por query params
```bash
curl "http://localhost:3001/tasks?search=estudiar&completed=false"
```

### Crear tarea
```bash
curl -X POST http://localhost:3001/tasks   -H "Content-Type: application/json"   -d '{"title":"Preparar entrega","completed":false}'
```

### Actualizar tarea
```bash
curl -X PUT http://localhost:3001/tasks/1   -H "Content-Type: application/json"   -d '{"title":"Preparar entrega final","completed":true}'
```

### Eliminar tarea
```bash
curl -X DELETE http://localhost:3001/tasks/1
```
