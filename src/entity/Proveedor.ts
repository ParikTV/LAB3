import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { IsString, Length, IsNotEmpty, IsOptional } from "class-validator";
import { Producto } from "./Producto";

@Entity()
export class Proveedor {
    @PrimaryColumn()
    @IsString({ message: "El código del proveedor debe ser una cadena de caracteres" })
    @IsNotEmpty({ message: "El código del proveedor no puede estar vacío" })
    codigo_proveedor: string;

    @Column()
    @IsString({ message: "El nombre del proveedor debe ser una cadena de caracteres" })
    @Length(1, 100, { message: "El nombre del proveedor debe tener entre 1 y 100 caracteres" })
    @IsNotEmpty({ message: "El nombre del proveedor no puede estar vacío" })
    nombres_proveedor: string;

    @Column()
    @IsString({ message: "El apellido del proveedor debe ser una cadena de caracteres" })
    @Length(1, 100, { message: "El apellido del proveedor debe tener entre 1 y 100 caracteres" })
    @IsNotEmpty({ message: "El apellido del proveedor no puede estar vacío" })
    apellidos_proveedor: string;

    @Column()
    @IsString({ message: "La dirección del proveedor debe ser una cadena de caracteres" })
    @IsOptional()
    direccion_proveedor: string;

    @Column()
    @IsString({ message: "La provincia del proveedor debe ser una cadena de caracteres" })
    @IsOptional()
    provincia_proveedor: string;

    @Column()
    @IsString({ message: "El teléfono del proveedor debe ser una cadena de caracteres" })
    @IsOptional()
    telefono_proveedor: string;

    @OneToMany(() => Producto, producto => producto.proveedor)
    productos: Producto[];
}
