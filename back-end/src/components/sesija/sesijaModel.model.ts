import IModel from "../../common/IModel.interface";

export default class sesijaModel implements IModel {
    sesija_id: number;
    brzina: number;
    korisnik_id: number;
    tekst_id: number;
}
