import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { IsString, IsNumber, Min, IsNotEmpty } from "class-validator";
import { Proveedor } from "./Proveedor";
import { DetalleFactura } from "./DetalleFactura";

@Entity()
export class Producto {
    @PrimaryColumn()
    @IsString({ message: "El código del producto debe ser una cadena de caracteres" })
    @IsNotEmpty({ message: "El código del producto no puede estar vacío" })
    codigo_producto: string;

    @Column()
    @IsString({ message: "La descripción del producto debe ser una cadena de caracteres" })
    @IsNotEmpty({ message: "La descripción del producto no puede estar vacío" })
    descripcion_producto: string;

    @Column("decimal")
    @IsNumber({}, { message: "El precio del producto debe ser un número" })
    @Min(0, { message: "El precio del producto no puede ser negativo" })
    precio_producto: number;

    @Column("int")
    @IsNumber({}, { message: "El stock máximo del producto debe ser un número" })
    @Min(0, { message: "El stock máximo del producto no puede ser negativo" })
    stock_maximo_producto: number;

    @Column("int")
    @IsNumber({}, { message: "El stock mínimo del producto debe ser un número" })
    @Min(0, { message: "El stock mínimo del producto no puede ser negativo" })
    stock_minimo_producto: number;

    @ManyToOne(() => Proveedor, proveedor => proveedor.productos)
    @IsNotEmpty({ message: "El proveedor del producto no puede estar vacío" })
    proveedor: Proveedor;

    @OneToMany(() => DetalleFactura, detalle => detalle.producto)
    detalles: DetalleFactura[];
}
