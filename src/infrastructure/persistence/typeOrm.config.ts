
import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { OrderAllocationEntity, PriceConfigurationEntity } from "./entity";
import { CreatePriceConfigurationTable1711473031881 } from "./migrations/1711473031881-CreatePriceConfigurationTable";
import { InsertInitialConfiguration1711473079727 } from "./migrations/1711473079727-InsertInitialConfiguration";

dotenv.config();

export default new DataSource({
    type: "postgres",
    port: Number(process.env.DB_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [OrderAllocationEntity, PriceConfigurationEntity],
    migrations: [CreatePriceConfigurationTable1711473031881, InsertInitialConfiguration1711473079727],
    synchronize: true,
    logging: false,
});
