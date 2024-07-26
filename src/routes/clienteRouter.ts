import { Router } from "express";
import { ClienteController } from "../controller/ClienteController";

const clienteRouter = Router();

clienteRouter.get("/", ClienteController.getAll);
clienteRouter.get("/:ruc", ClienteController.getById);
clienteRouter.post("/", ClienteController.create);
clienteRouter.put("/:ruc", ClienteController.update);
clienteRouter.delete("/:ruc", ClienteController.delete);

export { clienteRouter };
