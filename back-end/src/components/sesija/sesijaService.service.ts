import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import sesijaModel from "./sesijaModel.model";



interface IsesijaAdapterOptions extends IAdapterOptions {

}

const DefaultsesijaAdapterOptions: IsesijaAdapterOptions = {

};

class sesijaService extends BaseService<sesijaModel, IsesijaAdapterOptions> {
    tableName(): string {
        return "sesija";
    }

    protected async adaptToModel(data: any, options: IsesijaAdapterOptions): Promise<sesijaModel> {
        const model = new sesijaModel();
        model.sesija_id = data.sesija_id;
        model.korisnik_id = data.korisnik_id;
        model.tekst_id = data.tekst_id;
        model.brzina = data.brzina;
        return model;
    }
    public async add(data: any): Promise<sesijaModel> {
        console.log(data)
        return new Promise<sesijaModel>((resolve, reject) => {
            this.db.execute('INSERT INTO sesija (korisnik_id,tekst_id, brzina) VALUES (?, ?, ?)', [data.korisnik_id, data.tekst_id, data.brzina])
            .then(async result => {
                const info: any = result; 
                const novaSesija_id = +(info[0]?.insertId);
                const novaSesija: sesijaModel = await this.getById(novaSesija_id, {});

                resolve(novaSesija);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default sesijaService;
export { IsesijaAdapterOptions };