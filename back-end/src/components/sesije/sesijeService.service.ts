import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import sesijeModel from "./sesijeModel.model";



interface IsesijeAdapterOptions extends IAdapterOptions {

}

const DefaultsesijaAdapterOptions: IsesijeAdapterOptions = {

};

class sesijeService extends BaseService<sesijeModel, IsesijeAdapterOptions> {
    tableName(): string {
        return "sesije";
    }

    protected async adaptToModel(data: any, options: IsesijeAdapterOptions): Promise<sesijeModel> {
        const model = new sesijeModel();
        model.sesija_id = data.sesija_id;
        model.korisnik_id = data.korisnik_id;
        model.tekst_id = data.tekst_id;
        model.brzina = data.brzina;
        return model;
    }
    public async add(data: any): Promise<sesijeModel> {
        return new Promise<sesijeModel>((resolve, reject) => {
            this.db.execute('INSERT INTO sesije (korisnik_id, tekst_id, brzina) VALUES (?, ?, ?)', [data.korisnik_id, data.tekst_id, data.brzina])
            .then(async result => {
                const info: any = result; 
                const novaSesija_id = +(info[0]?.insertId);
                const novaSesija: sesijeModel = await this.getById(novaSesija_id, {});

                resolve(novaSesija);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default sesijeService;
export { IsesijeAdapterOptions };