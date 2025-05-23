import "reflect-metadata"
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entities/employee.entity";
import Address from "../entities/address.entity";
import Department from "../entities/department.entity";
import 'dotenv/config'
const datasource=new  DataSource({
    type:'postgres',
    host:process.env.HOST,
    port:5432,
    database:'training',
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    extra:{max:5,min:2},
    synchronize:false,
    logging:true,
    namingStrategy:new SnakeNamingStrategy(),
    entities:["dist/entities/*.js"],
    migrations:["dist/db/migrations/*.js"]
})

export default datasource;