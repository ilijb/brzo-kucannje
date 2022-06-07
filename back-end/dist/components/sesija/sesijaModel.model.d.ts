import IModel from "../../common/IModel.interface";
export default class sesijeModel implements IModel {
    sesija_id: number;
    korisnik_id: number;
    tekst_id: number;
    brzina: number;
}
