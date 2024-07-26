import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cliente } from "../entity/Cliente";
import { validate } from "class-validator";

export class ClienteController {
    static getAll = async (req: Request, res: Response) => {
        const clienteRepository = AppDataSource.getRepository(Cliente);
        try {
            const clientes = await clienteRepository.find();
            res.send(clientes);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching clientes",
                error: error.message
            });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const clienteRepository = AppDataSource.getRepository(Cliente);
        try {
            const cliente = await clienteRepository.findOneBy({ ruc_cliente: id });
            if (cliente) {
                res.send(cliente);
            } else {
                res.status(404).json({
                    message: "Cliente not found",
                    error: `No cliente found with RUC ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error fetching cliente",
                error: error.message
            });
        }
    };

    static create = async (req: Request, res: Response) => {
        const { ruc_cliente, nombres_cliente, apellidos_cliente, direccion_cliente, telefono_cliente } = req.body;

        const cliente = new Cliente();
        cliente.ruc_cliente = ruc_cliente;
        cliente.nombres_cliente = nombres_cliente;
        cliente.apellidos_cliente = apellidos_cliente;
        cliente.direccion_cliente = direccion_cliente;
        cliente.telefono_cliente = telefono_cliente;

        const errors = await validate(cliente);
        if (errors.length > 0) {
            res.status(400).json({
                message: "Validation failed",
                errors: errors
            });
            return;
        }

        const clienteRepository = AppDataSource.getRepository(Cliente);
        try {
            await clienteRepository.save(cliente);
            res.status(201).json({
                message: "Cliente created successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating cliente",
                error: error.message
            });
        }
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nombres_cliente, apellidos_cliente, direccion_cliente, telefono_cliente } = req.body;

        const clienteRepository = AppDataSource.getRepository(Cliente);
        try {
            const cliente = await clienteRepository.findOneBy({ ruc_cliente: id });
            if (cliente) {
                cliente.nombres_cliente = nombres_cliente;
                cliente.apellidos_cliente = apellidos_cliente;
                cliente.direccion_cliente = direccion_cliente;
                cliente.telefono_cliente = telefono_cliente;

                const errors = await validate(cliente);
                if (errors.length > 0) {
                    res.status(400).json({
                        message: "Validation failed",
                        errors: errors
                    });
                    return;
                }

                await clienteRepository.save(cliente);
                res.status(200).json({
                    message: "Cliente updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Cliente not found",
                    error: `No cliente found with RUC ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error updating cliente",
                error: error.message
            });
        }
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const clienteRepository = AppDataSource.getRepository(Cliente);
        try {
            const cliente = await clienteRepository.findOneBy({ ruc_cliente: id });
            if (cliente) {
                await clienteRepository.remove(cliente);
                res.status(204).json({
                    message: "Cliente deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Cliente not found",
                    error: `No cliente found with RUC ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error deleting cliente",
                error: error.message
            });
        }
    };
}
