import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Producto } from "./entity/Producto"
import { Proveedor } from "./entity/Proveedor"
import { Vendedor } from "./entity/Vendedor"
import { Cliente } from "./entity/Cliente"
import { CabeceraFactura } from "./entity/CabeceraFactura"
import { DetalleFactura } from "./entity/DetalleFactura"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "utn123**",
    database: "ejemplodb",
    synchronize: true,
    logging: false,
    entities: [User, Producto, CabeceraFactura,Cliente,Proveedor,Vendedor,DetalleFactura],
    migrations: [],
    subscribers: [],
})
