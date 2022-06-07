import rankService from "./rankService.service";
import { Request, Response } from "express";


class rankController {
    private rankServiceInstance: rankService;
    
    constructor(rankServiceInstance: rankService) {
        this.rankServiceInstance = rankServiceInstance;
    }

    async getAll(req: Request, res: Response) {

        this.rankServiceInstance.getAll(null).then(rank => {
            res.send(rank);
        }).catch(err => {
            res.status(500).send(err?.message);
        });

    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params.id;
        console.log(id);
        this.rankServiceInstance.getById(id, null).then(rank => {
            res.send(rank);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }

    // async add(req: Request, res: Response) {
    //     const data: any = req.body;
    //     this.rankServiceInstance.add(data).then(rank => {
    //         res.send(rank);
    //     }).catch(err => {
    //         res.send(err);
    //     }); 
    // }
}

export default rankController;
