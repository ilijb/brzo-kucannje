import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import kategorijaModel from "./kategorijaModel.model";
import korisniciModel from "./kategorijaModel.model";


class kategorijaService extends BaseService<kategorijaModel, IAdapterOptions> {
    tableName(): string {
        return "kategorija";
    }

    protected async adaptToModel(data: any, options: IAdapterOptions = null): Promise<korisniciModel> {
        const  kategorija: kategorijaModel = new kategorijaModel();
        kategorija.kategorija_id = data.kategorija_id;
        kategorija.kategorija = data.kategorija;

        return kategorija;

    }
    public async add(data: any): Promise<kategorijaModel> {
        return new Promise<kategorijaModel>((resolve, reject) => {
            this.db.execute('INSERT INTO kategorija (kategorija) VALUES (?)', [data.kategorija])
            .then(async result => {
                const info: any = result; 
                const kategorija_id = +(info[0]?.insertId);
                const kategorija: kategorijaModel = await this.getById(kategorija_id, {});

                resolve(kategorija);
            }).catch(err => {
                reject(err);
            });
        });
    }
}




export default kategorijaService;