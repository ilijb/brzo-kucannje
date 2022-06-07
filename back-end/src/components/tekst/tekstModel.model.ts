import IModel from "../../common/IModel.interface";


export default class tekstModel implements IModel {
    tekst_id: number;
    tekst: string;
    naslov: string;
    kategorija_id: number;
}