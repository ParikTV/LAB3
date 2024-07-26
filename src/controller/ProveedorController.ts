import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Proveedor } from "../entity/Proveedor";
import { validate } from "class-validator";

export class ProveedorController {
    static getAll = async (req: Request, res: Response) => {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        try {
            const proveedores = await proveedorRepository.find();
            res.send(proveedores);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching proveedores",
                error: error.message
            });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        try {
            const proveedor = await proveedorRepository.findOneBy({ codigo_proveedor: id });
            if (proveedor) {
                res.send(proveedor);
            } else {
                res.status(404).json({
                    message: "Proveedor not found",
                    error: `No proveedor found with code ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error fetching proveedor",
                error: error.message
            });
        }
    };

    static create = async (req: Request, res: Response) => {
        const { codigo_proveedor, nombres_proveedor, apellidos_proveedor, direccion_proveedor, provincia_proveedor, telefono_proveedor } = req.body;

        const proveedor = new Proveedor();
        proveedor.codigo_proveedor = codigo_proveedor;
        proveedor.nombres_proveedor = nombres_proveedor;
        proveedor.apellidos_proveedor = apellidos_proveedor;
        proveedor.direccion_proveedor = direccion_proveedor;
        proveedor.provincia_proveedor = provincia_proveedor;
        proveedor.telefono_proveedor = telefono_proveedor;

        const errors = await validate(proveedor);
        if (errors.length > 0) {
            res.status(400).json({
                message: "Validation failed",
                errors: errors
            });
            return;
        }

        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        try {
            await proveedorRepository.save(proveedor);
            res.status(201).json({
                message: "Proveedor created successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating proveedor",
                error: error.message
            });
        }
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nombres_proveedor, apellidos_proveedor, direccion_proveedor, provincia_proveedor, telefono_proveedor } = req.body;

        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        try {
            const proveedor = await proveedorRepository.findOneBy({ codigo_proveedor: id });
            if (proveedor) {
                proveedor.nombres_proveedor = nombres_proveedor;
                proveedor.apellidos_proveedor = apellidos_proveedor;
                proveedor.direccion_proveedor = direccion_proveedor;
                proveedor.provincia_proveedor = provincia_proveedor;
                proveedor.telefono_proveedor = telefono_proveedor;

                const errors = await validate(proveedor);
                if (errors.length > 0) {
                    res.status(400).json({
                        message: "Validation failed",
                        errors: errors
                    });
                    return;
                }

                await proveedorRepository.save(proveedor);
                res.status(200).json({
                    message: "Proveedor updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Proveedor not found",
                    error: `No proveedor found with code ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error updating proveedor",
                error: error.message
            });
        }
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        try {
            const proveedor = await proveedorRepository.findOneBy({ codigo_proveedor: id });
            if (proveedor) {
                await proveedorRepository.remove(proveedor);
                res.status(204).json({
                    message: "Proveedor deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Proveedor not found",
                    error: `No proveedor found with code ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error deleting proveedor",
                error: error.message
            });
        }
    };
}
