import { Router } from "express";
import { FacturaController } from "../controller/FacturaController";

const facturaRouter = Router();

facturaRouter.get("/", FacturaController.getAll);
facturaRouter.get("/:id", FacturaController.getById);
facturaRouter.post("/", FacturaController.create);
facturaRouter.put("/:id", FacturaController.update);
facturaRouter.delete("/:id", FacturaController.delete);

export { facturaRouter };
