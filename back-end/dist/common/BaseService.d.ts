import * as mysql2 from "mysql2/promise";
import IAdapterOptions from "./IAdapterOptions.interface";
import IModel from "./IModel.interface";
export default abstract class BaseService<ReturnModel extends IModel, AdaterOptions extends IAdapterOptions> {
    private database;
    constructor(databaseConnection: mysql2.Connection);
    protected get db(): mysql2.Connection;
    abstract tableName(): string;
    protected abstract adaptToModel(data: any, options: AdaterOptions): Promise<ReturnModel>;
    getAll(options: AdaterOptions): Promise<ReturnModel[]>;
    getById(id: number, options: AdaterOptions): Promise<ReturnModel | null>;
    protected getAllByFieldNameAnValue(fieldName: string, value: any, options: AdaterOptions): Promise<ReturnModel[]>;
}
