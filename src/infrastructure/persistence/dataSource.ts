
import "reflect-metadata";
import { DataSource } from "typeorm";
import { OrderAllocationEntity } from "./entity";

export const initDataSource = (host: string, port: number, user: string, pass: string, db: string): DataSource => {
    try {
        const dataSource = new DataSource({
            type: "postgres",
            host: host,
            port: port,
            username: user,
            password: pass,
            database: db,
            entities: [OrderAllocationEntity],
            synchronize: true,
            logging: false
        });
        dataSource.initialize();
        return dataSource;
    } catch (error) {
        // Handle error if initialization fails
        throw new Error(`Failed to initialize data source: ${error}`);
    }
};