import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import tekstModel from "./tekstModel.model";
import korisniciModel from "./tekstModel.model";


class tekstService extends BaseService<tekstModel, IAdapterOptions> {
    tableName(): string {
        return "tekst";
    }

    protected async adaptToModel(data: any, options: IAdapterOptions = null): Promise<korisniciModel> {
        const  tekst: tekstModel = new tekstModel();
        tekst.tekst_id = data.tekst_id;
        tekst.tekst = data.tekst;
        tekst.naslov = data.naslov;
        tekst.kategorija_id = data.kategorija_id;
        return tekst;

    }
    public async add(data: any): Promise<tekstModel> {
        return new Promise<tekstModel>((resolve, reject) => {
            this.db.execute('INSERT INTO tekst (tekst,naslov,kategorija_id) VALUES (?,?,?)', [data.tekst,data.naslov,data.kategorija_id])
            .then(async result => {
                const info: any = result; 
                const tekst_id = +(info[0]?.insertId);
                const tekst: tekstModel = await this.getById(tekst_id, {});

                resolve(tekst);
            }).catch(err => {
                reject(err);
            });
        });
    }
}




export default tekstService;