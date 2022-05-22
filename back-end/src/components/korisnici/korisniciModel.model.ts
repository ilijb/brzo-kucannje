import IModel from "../../common/IModel.interface";

export default class korisniciModel implements IModel {
    korisnikId: number;
    korisnickoIme: string;
    pwHash: string;
    email: string;
    rank_id: number;
}
