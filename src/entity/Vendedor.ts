import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { IsString, Length, IsNotEmpty, IsOptional } from "class-validator";
import { CabeceraFactura } from "./CabeceraFactura";

@Entity()
export class Vendedor {
    @PrimaryColumn()
    @IsString({ message: "El código del vendedor debe ser una cadena de caracteres" })
    @IsNotEmpty({ message: "El código del vendedor no puede estar vacío" })
    codigo_vendedor: string;

    @Column()
    @IsString({ message: "El nombre del vendedor debe ser una cadena de caracteres" })
    @Length(1, 100, { message: "El nombre del vendedor debe tener entre 1 y 100 caracteres" })
    @IsNotEmpty({ message: "El nombre del vendedor no puede estar vacío" })
    nombres_vendedor: string;

    @Column()
    @IsString({ message: "El apellido del vendedor debe ser una cadena de caracteres" })
    @Length(1, 100, { message: "El apellido del vendedor debe tener entre 1 y 100 caracteres" })
    @IsNotEmpty({ message: "El apellido del vendedor no puede estar vacío" })
    apellidos_vendedor: string;

    @Column({ nullable: true })
    @IsString({ message: "La dirección del vendedor debe ser una cadena de caracteres" })
    @IsOptional()
    direccion_vendedor?: string;

    @Column({ nullable: true })
    @IsString({ message: "El teléfono del vendedor debe ser una cadena de caracteres" })
    @IsOptional()
    telefono_vendedor?: string;

    @Column({ nullable: true })
    @IsString({ message: "El celular del vendedor debe ser una cadena de caracteres" })
    @IsOptional()
    celular_vendedor?: string;

    @OneToMany(() => CabeceraFactura, factura => factura.vendedor)
    facturas: CabeceraFactura[];
}
