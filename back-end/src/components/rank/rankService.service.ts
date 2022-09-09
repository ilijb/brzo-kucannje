import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import rankModel from "./rankModel.model";





class rankService extends BaseService<rankModel, IAdapterOptions> {
    tableName(): string {
        return "rank";
    }

    protected async adaptToModel(data: any, options: IAdapterOptions = null): Promise<rankModel> {
        const model = new rankModel();
        model.rank_id = data.rank_id;
        model.rank = data.rank;
        model.broj_sekundi = data.broj_sekundi;
        return model;
    }
    // public async add(data: any): Promise<rankModel> {
    //     console.log(data.rank)
    //     return new Promise<rankModel>((resolve, reject) => {
    //         this.db.execute('INSERT INTO rank (rank,rank_id) VALUES (?,?)', [data.rank,data.rank_id])
    //         .then(async result => {
    //             const info: any = result; 
    //             const novarank_id = +(info[0]?.insertId);
    //             const novarank: rankModel = await this.getById(novarank_id, {});

    //             resolve(novarank);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // }
}

export default rankService;