import IModel from "../../common/IModel.interface";
export default class korisnikModel implements IModel {
    korisnik_id: number;
    korisnicko_ime: string;
    pw_hash: string;
    email: string;
    rank_id: number;
}
