import IModel from "../../common/IModel.interface";

export default class rankModel implements IModel {
    rank_id: number;
    rank: string;
    broj_sekundi: number;
    opseg_pocetak: number;
    opseg_kraj: number;
}
