import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { IsString, Length, IsNotEmpty, IsOptional } from "class-validator";
import { CabeceraFactura } from "./CabeceraFactura";

@Entity()
export class Cliente {
    @PrimaryColumn()
    @IsString({ message: "El RUC del cliente debe ser una cadena de caracteres" })
    @IsNotEmpty({ message: "El RUC del cliente no puede estar vacío" })
    ruc_cliente: string;

    @Column()
    @IsString({ message: "El nombre del cliente debe ser una cadena de caracteres" })
    @Length(1, 100, { message: "El nombre del cliente debe tener entre 1 y 100 caracteres" })
    @IsNotEmpty({ message: "El nombre del cliente no puede estar vacío" })
    nombres_cliente: string;

    @Column()
    @IsString({ message: "El apellido del cliente debe ser una cadena de caracteres" })
    @Length(1, 100, { message: "El apellido del cliente debe tener entre 1 y 100 caracteres" })
    @IsNotEmpty({ message: "El apellido del cliente no puede estar vacío" })
    apellidos_cliente: string;

    @Column()
    @IsString({ message: "La dirección del cliente debe ser una cadena de caracteres" })
    @IsOptional()
    direccion_cliente: string;

    @Column()
    @IsString({ message: "El teléfono del cliente debe ser una cadena de caracteres" })
    @IsOptional()
    telefono_cliente: string;

    @OneToMany(() => CabeceraFactura, factura => factura.cliente)
    facturas: CabeceraFactura[];
}
