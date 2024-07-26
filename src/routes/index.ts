import { Router } from "express";
import { facturaRouter } from "./facturaRouter";
import { clienteRouter } from "./clienteRouter";
import { vendedorRouter } from "./vendedorRouter";
import { productoRouter } from "./productoRouter";
import { proveedorRouter } from "./proveedorRouter";

const routes = Router();

routes.use("/facturas", facturaRouter);
routes.use("/clientes", clienteRouter);
routes.use("/vendedores", vendedorRouter);
routes.use("/productos", productoRouter);
routes.use("/proveedores", proveedorRouter);

export default routes;
