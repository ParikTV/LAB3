import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsInt, Min, IsNotEmpty } from "class-validator";
import { CabeceraFactura } from "./CabeceraFactura";
import { Producto } from "./Producto";

@Entity()
export class DetalleFactura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    @IsInt({ message: "La cantidad debe ser un número entero" })
    @Min(1, { message: "La cantidad debe ser al menos 1" })
    @IsNotEmpty({ message: "La cantidad no puede estar vacía" })
    cantidad: number;

    @ManyToOne(() => CabeceraFactura, factura => factura.detalles)
    @IsNotEmpty({ message: "La factura no puede estar vacía" })
    factura: CabeceraFactura;

    @ManyToOne(() => Producto, producto => producto.detalles)
    @IsNotEmpty({ message: "El producto no puede estar vacío" })
    producto: Producto;
}
