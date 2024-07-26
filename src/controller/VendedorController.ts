import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vendedor } from "../entity/Vendedor";
import { validate } from "class-validator";

export class VendedorController {
    static getAll = async (req: Request, res: Response) => {
        const vendedorRepository = AppDataSource.getRepository(Vendedor);
        try {
            const vendedores = await vendedorRepository.find();
            res.send(vendedores);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching vendedores",
                error: error.message
            });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const vendedorRepository = AppDataSource.getRepository(Vendedor);
        try {
            const vendedor = await vendedorRepository.findOneBy({ codigo_vendedor: id });
            if (vendedor) {
                res.send(vendedor);
            } else {
                res.status(404).json({
                    message: "Vendedor not found",
                    error: `No vendedor found with code ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error fetching vendedor",
                error: error.message
            });
        }
    };

    static create = async (req: Request, res: Response) => {
        const { codigo_vendedor, nombres_vendedor, apellidos_vendedor, direccion_vendedor, telefono_vendedor, celular_vendedor } = req.body;

        const vendedor = new Vendedor();
        vendedor.codigo_vendedor = codigo_vendedor;
        vendedor.nombres_vendedor = nombres_vendedor;
        vendedor.apellidos_vendedor = apellidos_vendedor;
        vendedor.direccion_vendedor = direccion_vendedor;
        vendedor.telefono_vendedor = telefono_vendedor;
        vendedor.celular_vendedor = celular_vendedor;

        const errors = await validate(vendedor);
        if (errors.length > 0) {
            res.status(400).json({
                message: "Validation failed",
                errors: errors
            });
            return;
        }

        const vendedorRepository = AppDataSource.getRepository(Vendedor);
        try {
            await vendedorRepository.save(vendedor);
            res.status(201).json({
                message: "Vendedor created successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating vendedor",
                error: error.message
            });
        }
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nombres_vendedor, apellidos_vendedor, direccion_vendedor, telefono_vendedor, celular_vendedor } = req.body;

        const vendedorRepository = AppDataSource.getRepository(Vendedor);
        try {
            const vendedor = await vendedorRepository.findOneBy({ codigo_vendedor: id });
            if (vendedor) {
                vendedor.nombres_vendedor = nombres_vendedor;
                vendedor.apellidos_vendedor = apellidos_vendedor;
                vendedor.direccion_vendedor = direccion_vendedor;
                vendedor.telefono_vendedor = telefono_vendedor;
                vendedor.celular_vendedor = celular_vendedor;

                const errors = await validate(vendedor);
                if (errors.length > 0) {
                    res.status(400).json({
                        message: "Validation failed",
                        errors: errors
                    });
                    return;
                }

                await vendedorRepository.save(vendedor);
                res.status(200).json({
                    message: "Vendedor updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Vendedor not found",
                    error: `No vendedor found with code ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error updating vendedor",
                error: error.message
            });
        }
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const vendedorRepository = AppDataSource.getRepository(Vendedor);
        try {
            const vendedor = await vendedorRepository.findOneBy({ codigo_vendedor: id });
            if (vendedor) {
                await vendedorRepository.remove(vendedor);
                res.status(204).json({
                    message: "Vendedor deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Vendedor not found",
                    error: `No vendedor found with code ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error deleting vendedor",
                error: error.message
            });
        }
    };
}
