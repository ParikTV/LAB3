import { Router } from "express";
import { VendedorController } from "../controller/VendedorController";

const vendedorRouter = Router();

vendedorRouter.get("/", VendedorController.getAll);
vendedorRouter.get("/:codigo", VendedorController.getById);
vendedorRouter.post("/", VendedorController.create);
vendedorRouter.put("/:codigo", VendedorController.update);
vendedorRouter.delete("/:codigo", VendedorController.delete);

export { vendedorRouter };
