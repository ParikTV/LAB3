import { Router } from "express";
import { ProveedorController } from "../controller/ProveedorController";

const proveedorRouter = Router();

proveedorRouter.get("/", ProveedorController.getAll);
proveedorRouter.get("/:codigo", ProveedorController.getById);
proveedorRouter.post("/", ProveedorController.create);
proveedorRouter.put("/:codigo", ProveedorController.update);
proveedorRouter.delete("/:codigo", ProveedorController.delete);

export { proveedorRouter };
