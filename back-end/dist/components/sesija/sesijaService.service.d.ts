import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import sesijeModel from "./sesijaModel.model";
interface IsesijeAdapterOptions extends IAdapterOptions {
}
declare class sesijeService extends BaseService<sesijeModel, IsesijeAdapterOptions> {
    tableName(): string;
    protected adaptToModel(data: any, options: IsesijeAdapterOptions): Promise<sesijeModel>;
    add(data: any): Promise<sesijeModel>;
}
export default sesijeService;
export { IsesijeAdapterOptions };
