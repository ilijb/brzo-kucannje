import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import greskaModel from "./greskaModel.model";
import korisniciModel from "./greskaModel.model";
declare class greskaService extends BaseService<korisniciModel, IAdapterOptions> {
    tableName(): string;
    protected adaptToModel(data: any, options?: IAdapterOptions): Promise<korisniciModel>;
    add(data: any): Promise<greskaModel>;
}
export default greskaService;
