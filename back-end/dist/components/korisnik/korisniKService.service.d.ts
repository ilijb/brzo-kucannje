import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import korisniciModel from "./korisnikModel.model";
interface IkorisnikAdapterOptions extends IAdapterOptions {
    test: boolean;
}
declare const DefaultkorisnikAdapterOptions: IkorisnikAdapterOptions;
declare class korisnikService extends BaseService<korisniciModel, IAdapterOptions> {
    tableName(): string;
    protected adaptToModel(data: any, options?: IAdapterOptions): Promise<korisniciModel>;
    add(data: any): Promise<korisniciModel>;
}
export default korisnikService;
export { DefaultkorisnikAdapterOptions };
