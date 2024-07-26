import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CabeceraFactura } from "../entity/CabeceraFactura";
import { DetalleFactura } from "../entity/DetalleFactura";
import { validate } from "class-validator";
import { Cliente } from "../entity/Cliente";
import { Vendedor } from "../entity/Vendedor";
import { Producto } from "../entity/Producto";

export class FacturaController {
    static getAll = async (req: Request, res: Response) => {
        const cabeceraFacturaRepository = AppDataSource.getRepository(CabeceraFactura);
        try {
            const facturas = await cabeceraFacturaRepository.find({ relations: ["detalles"] });
            res.send(facturas);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching facturas",
                error: error.message
            });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const cabeceraFacturaRepository = AppDataSource.getRepository(CabeceraFactura);
        try {
            const factura = await cabeceraFacturaRepository.findOne({ where: { numero: parseInt(id) }, relations: ["detalles"] });
            if (factura) {
                res.send(factura);
            } else {
                res.status(404).json({
                    message: "Factura not found",
                    error: `No factura found with ID ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error fetching factura",
                error: error.message
            });
        }
    };

    static create = async (req: Request, res: Response) => {
        const { fecha, cliente: clienteData, vendedor: vendedorData, detalles } = req.body;

        // Validate Cliente
        const clienteRepository = AppDataSource.getRepository(Cliente);
        const cliente = await clienteRepository.findOneBy({ ruc_cliente: clienteData.ruc_cliente });
        if (!cliente) {
            return res.status(400).json({
                message: "Error creating factura",
                error: "Cliente not found"
            });
        }

        // Validate Vendedor
        const vendedorRepository = AppDataSource.getRepository(Vendedor);
        const vendedor = await vendedorRepository.findOneBy({ codigo_vendedor: vendedorData.codigo_vendedor });
        if (!vendedor) {
            return res.status(400).json({
                message: "Error creating factura",
                error: "Vendedor not found"
            });
        }

        // Validate Productos and Update Stock
        const productoRepository = AppDataSource.getRepository(Producto);
        for (const detalle of detalles) {
            const producto = await productoRepository.findOneBy({ codigo_producto: detalle.producto.codigo_producto });
            if (!producto) {
                return res.status(400).json({
                    message: "Error creating factura",
                    error: `Producto ${detalle.producto.codigo_producto} not found`
                });
            }
            if (producto.stock_maximo_producto < detalle.cantidad) {
                return res.status(400).json({
                    message: "Error creating factura",
                    error: `No hay suficiente stock para el producto ${producto.codigo_producto}`
                });
            }
        }

        // Create Factura
        const factura = new CabeceraFactura();
        factura.fecha = new Date(fecha);
        factura.cliente = cliente;
        factura.vendedor = vendedor;
        factura.detalles = [];

        for (const detalle of detalles) {
            const producto = await productoRepository.findOneBy({ codigo_producto: detalle.producto.codigo_producto });
            if (!producto) {
                return res.status(400).json({
                    message: "Error creating factura",
                    error: `Producto ${detalle.producto.codigo_producto} not found`
                });
            }
            if (producto.stock_maximo_producto < detalle.cantidad) {
                return res.status(400).json({
                    message: "Error creating factura",
                    error: `No hay suficiente stock para el producto ${producto.codigo_producto}`
                });
            }

            producto.stock_maximo_producto -= detalle.cantidad;
            await productoRepository.save(producto);

            const detalleFactura = new DetalleFactura();
            detalleFactura.cantidad = detalle.cantidad;
            detalleFactura.producto = producto;
            detalleFactura.factura = factura; 

            factura.detalles.push(detalleFactura);
        }

        const errors = await validate(factura);
        if (errors.length > 0) {
            res.status(400).json({
                message: "Validation failed",
                errors: errors
            });
            return;
        }

        const cabeceraFacturaRepository = AppDataSource.getRepository(CabeceraFactura);
        try {
            await cabeceraFacturaRepository.save(factura);
            res.status(201).json({
                message: "Factura created successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating factura",
                error: error.message
            });
        }
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { fecha, cliente: clienteData, vendedor: vendedorData, detalles } = req.body;

        const cabeceraFacturaRepository = AppDataSource.getRepository(CabeceraFactura);
        try {
            let factura = await cabeceraFacturaRepository.findOne({ where: { numero: parseInt(id) }, relations: ["detalles"] });

            if (factura) {
                factura.fecha = new Date(fecha);
                factura.cliente = clienteData;
                factura.vendedor = vendedorData;
                factura.detalles = detalles.map((detalle: any) => {
                    const d = new DetalleFactura();
                    d.cantidad = detalle.cantidad;
                    d.producto = detalle.producto;
                    return d;
                });

                const errors = await validate(factura);
                if (errors.length > 0) {
                    res.status(400).json({
                        message: "Validation failed",
                        errors: errors
                    });
                    return;
                }

                await cabeceraFacturaRepository.save(factura);
                res.status(200).json({
                    message: "Factura updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Factura not found",
                    error: `No factura found with ID ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error updating factura",
                error: error.message
            });
        }
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const cabeceraFacturaRepository = AppDataSource.getRepository(CabeceraFactura);
        try {
            const factura = await cabeceraFacturaRepository.findOne({ where: { numero: parseInt(id) } });
            if (factura) {
                await cabeceraFacturaRepository.remove(factura);
                res.status(204).json({
                    message: "Factura deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Factura not found",
                    error: `No factura found with ID ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error deleting factura",
                error: error.message
            });
        }
    };
}
