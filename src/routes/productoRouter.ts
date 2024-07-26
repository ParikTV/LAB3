import { Router } from "express";
import { ProductoController } from "../controller/ProductoController";

const productoRouter = Router();

productoRouter.get("/", ProductoController.getAll);
productoRouter.get("/:codigo", ProductoController.getById);
productoRouter.post("/", ProductoController.create);
productoRouter.put("/:codigo", ProductoController.update);
productoRouter.delete("/:codigo", ProductoController.delete);

export { productoRouter };
