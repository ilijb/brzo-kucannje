import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import sesijaModel from "./sesijaModel.model";
import * as mysql2 from "mysql2/promise";


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

    public getAllByUser(korisnik_id: number, options: IsesijaAdapterOptions): Promise<sesijaModel[]> {
        const tableName = this.tableName();

        return new Promise<sesijaModel[]>(
            (resolve, reject) => {
                const sql: string = `SELECT * FROM \`${ tableName }\` WHERE korisnik_id=${korisnik_id} ORDER BY sesija_id DESC LIMIT 0, 10;`;

                this.db.execute(sql)
                    .then( async ( [ rows ] ) => {
                        if (rows === undefined) {
                            return resolve([]);
                        }

                        const items: sesijaModel[] = [];

                        for (const row of rows as mysql2.RowDataPacket[]) {
                            items.push(
                                await this.adaptToModel(row, options)
                            );
                        }

                        resolve(items);
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        );
    }
}

export default sesijaService;
export { IsesijaAdapterOptions };