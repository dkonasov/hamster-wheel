import { DataSource, DataSourceOptions } from "typeorm";

export class DataSourceSingletonFactory {
    private static instance: DataSource;
    static createInstance(options: DataSourceOptions) {
        if (this.instance) {
            throw("Instance was already created!");
        } else {
            this.instance = new DataSource(options);
            this.instance.initialize();
        }
        
    }

    static getInstance(): DataSource {
        if (!this.instance) {
            throw("No instance was created yet!");
        }
        return this.instance;
    }
}