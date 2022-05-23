import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import korisniciModel from "./korisniciModel.model";


interface IkorisniciAdapterOptions extends IAdapterOptions {
    test: boolean;
}

const DefaultkorisniciAdapterOptions: IkorisniciAdapterOptions = {
    test: false,
}

class korisniciService extends BaseService<korisniciModel, IAdapterOptions> {
    tableName(): string {
        return "korisnik";
    }

    protected async adaptToModel(data: any, options: IAdapterOptions = DefaultkorisniciAdapterOptions): Promise<korisniciModel> {
        const  korisnik: korisniciModel = new korisniciModel();
        korisnik.korisnik_id = +data?.korisnik_id;
        korisnik.korisnicko_ime = data?.korisnicko_ime;
        korisnik.pw_hash = data?.pw_hash;
        korisnik.email = data?.email;
        korisnik.rank_id = +data?.rank_id;

        return korisnik;

    }
    public async add(data: any): Promise<korisniciModel> {
        return new Promise<korisniciModel>((resolve, reject) => {
            this.db.execute('INSERT INTO korisnik (korisnicko_ime, pw_hash, email, rank_id) VALUES (?, ?, ?, ?)', [data.korisnicko_ime, data.pw_hash, data.email, data.rank_id])
            .then(async result => {
                const info: any = result; 
                const noviKorisnik_id = +(info[0]?.insertId);
                const noviKorisnik: korisniciModel = await this.getById(noviKorisnik_id, {});

                resolve(noviKorisnik);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // public async getById(id: number, options: IAdapterOptions): Promise<korisniciModel> {
    //     return new Promise<korisniciModel>((resolve, reject) => {
    //         this.db.execute('SELECT * FROM korisnik WHERE korisnik_id = ?', [id])
    //         .then(async result => {
    //             const info: any = result; 
    //             const korisnik: korisniciModel = await this.adaptToModel(info[0]);

    //             resolve(korisnik);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // }
}

export default korisniciService;
export { DefaultkorisniciAdapterOptions };