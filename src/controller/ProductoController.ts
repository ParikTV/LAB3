import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";
import { validate } from "class-validator";

export class ProductoController {
    static getAll = async (req: Request, res: Response) => {
        const productoRepository = AppDataSource.getRepository(Producto);
        try {
            const productos = await productoRepository.find();
            res.send(productos);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching productos",
                error: error.message
            });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const productoRepository = AppDataSource.getRepository(Producto);
        try {
            const producto = await productoRepository.findOneBy({ codigo_producto: id });
            if (producto) {
                res.send(producto);
            } else {
                res.status(404).json({
                    message: "Producto not found",
                    error: `No producto found with code ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error fetching producto",
                error: error.message
            });
        }
    };

    static create = async (req: Request, res: Response) => {
        const { codigo_producto, descripcion_producto, precio_producto, stock_maximo_producto, stock_minimo_producto, proveedor } = req.body;

        const producto = new Producto();
        producto.codigo_producto = codigo_producto;
        producto.descripcion_producto = descripcion_producto;
        producto.precio_producto = precio_producto;
        producto.stock_maximo_producto = stock_maximo_producto;
        producto.stock_minimo_producto = stock_minimo_producto;
        producto.proveedor = proveedor; 

        const errors = await validate(producto);
        if (errors.length > 0) {
            res.status(400).json({
                message: "Validation failed",
                errors: errors
            });
            return;
        }

        const productoRepository = AppDataSource.getRepository(Producto);
        try {
            await productoRepository.save(producto);
            res.status(201).json({
                message: "Producto created successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating producto",
                error: error.message
            });
        }
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { descripcion_producto, precio_producto, stock_maximo_producto, stock_minimo_producto, proveedor } = req.body;

        const productoRepository = AppDataSource.getRepository(Producto);
        try {
            const producto = await productoRepository.findOneBy({ codigo_producto: id });
            if (producto) {
                producto.descripcion_producto = descripcion_producto;
                producto.precio_producto = precio_producto;
                producto.stock_maximo_producto = stock_maximo_producto;
                producto.stock_minimo_producto = stock_minimo_producto;
                producto.proveedor = proveedor; 

                const errors = await validate(producto);
                if (errors.length > 0) {
                    res.status(400).json({
                        message: "Validation failed",
                        errors: errors
                    });
                    return;
                }

                await productoRepository.save(producto);
                res.status(200).json({
                    message: "Producto updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Producto not found",
                    error: `No producto found with code ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error updating producto",
                error: error.message
            });
        }
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const productoRepository = AppDataSource.getRepository(Producto);
        try {
            const producto = await productoRepository.findOneBy({ codigo_producto: id });
            if (producto) {
                await productoRepository.remove(producto);
                res.status(204).json({
                    message: "Producto deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Producto not found",
                    error: `No producto found with code ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error deleting producto",
                error: error.message
            });
        }
    };
}
