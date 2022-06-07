import IModel from "../../common/IModel.interface";
export default class greskaModel implements IModel {
    greska_id: number;
    greska: string;
    vreme_ispravke: Date;
    sesija_id: number;
}
