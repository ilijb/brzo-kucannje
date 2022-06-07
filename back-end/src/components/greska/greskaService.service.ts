import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import greskaModel from "./greskaModel.model";
import korisniciModel from "./greskaModel.model";


class greskaService extends BaseService<greskaModel, IAdapterOptions> {
    tableName(): string {
        return "greska";
    }

    protected async adaptToModel(data: any, options: IAdapterOptions = null): Promise<korisniciModel> {
        const  greska: greskaModel = new greskaModel();
        greska.greska_id = data.greska_id;
        greska.greska = data.greska;
        greska.vreme_ispravke = data.vreme_ispravke;
        greska.sesija_id = data.sesija_id;

        return greska;

    }
    public async add(data: any): Promise<greskaModel> {
        return new Promise<greskaModel>((resolve, reject) => {
            this.db.execute('INSERT INTO greska (greska, vreme_ispravke, sesija_id) VALUES (?, ?, ?)', [data.greska, data.vreme_ispravke, data.sesija_id])
            .then(async result => {
                const info: any = result; 
                const greska_id = +(info[0]?.insertId);
                const greska: greskaModel = await this.getById(greska_id, {});

                resolve(greska);
            }).catch(err => {
                reject(err);
            });
        });
    }
}




export default greskaService;