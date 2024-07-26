import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";
import { DetalleFactura } from "./DetalleFactura";
import { IsDate, IsNotEmpty } from "class-validator";

@Entity()
export class CabeceraFactura {
    @PrimaryGeneratedColumn()
    numero: number;

    @Column()
    @IsDate({ message: "La fecha debe ser una fecha válida" })
    @IsNotEmpty({ message: "La fecha no puede estar vacía" })
    fecha: Date;

    @ManyToOne(() => Cliente, cliente => cliente.facturas)
    @IsNotEmpty({ message: "El cliente no puede estar vacío" })
    cliente: Cliente;

    @ManyToOne(() => Vendedor, vendedor => vendedor.facturas)
    @IsNotEmpty({ message: "El vendedor no puede estar vacío" })
    vendedor: Vendedor;

    @OneToMany(() => DetalleFactura, detalle => detalle.factura, { cascade: true })
    detalles: DetalleFactura[];
}
