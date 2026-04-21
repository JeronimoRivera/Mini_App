"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskRouter = void 0;
const express_1 = require("express");
/**
 * Las rutas solo definen endpoints y delegan en el controller.
 */
const createTaskRouter = (taskController) => {
    const router = (0, express_1.Router)();
    router.get("/tasks", taskController.getAll);
    router.get("/tasks/:id", taskController.getById);
    router.post("/tasks", taskController.create);
    router.put("/tasks/:id", taskController.update);
    router.delete("/tasks/:id", taskController.delete);
    return router;
};
exports.createTaskRouter = createTaskRouter;
