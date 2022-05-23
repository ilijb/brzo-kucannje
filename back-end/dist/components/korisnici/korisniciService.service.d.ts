import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import korisniciModel from "./korisniciModel.model";
interface IkorisniciAdapterOptions extends IAdapterOptions {
    test: boolean;
}
declare const DefaultkorisniciAdapterOptions: IkorisniciAdapterOptions;
declare class korisniciService extends BaseService<korisniciModel, IAdapterOptions> {
    tableName(): string;
    protected adaptToModel(data: any, options?: IAdapterOptions): Promise<korisniciModel>;
    add(data: any): Promise<korisniciModel>;
}
export default korisniciService;
export { DefaultkorisniciAdapterOptions };
