import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import korisniciModel from "./korisnikModel.model";
import * as bcrypt from "bcrypt";


interface IkorisnikAdapterOptions extends IAdapterOptions {
    test: boolean;
}

const DefaultkorisnikAdapterOptions: IkorisnikAdapterOptions = {
    test: false,
}

class korisnikService extends BaseService<korisniciModel, IAdapterOptions> {
    tableName(): string {
        return "korisnik";
    }

    protected async adaptToModel(data: any, options: IAdapterOptions = DefaultkorisnikAdapterOptions): Promise<korisniciModel> {
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
            const passwordHash = bcrypt.hashSync(data.password, 10);
            this.db.execute('INSERT INTO korisnik (name, surname, pw_hash, email) VALUES (?, ?, ?, ?)', [data.forename, data.surname, passwordHash, data.email])
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

    public async getByEmail(email: string): Promise<korisniciModel> {
        return new Promise<korisniciModel>((resolve, reject) => {
            this.db.execute('SELECT * FROM korisnik WHERE email = ?', [email])
            .then(async result => {
                const info: any = result; 
                const korisnik: korisniciModel = await this.adaptToModel(info[0][0], {});
                resolve(korisnik);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default korisnikService;
export { DefaultkorisnikAdapterOptions };