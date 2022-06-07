import sesijaService from "./sesijaService.service";
import { Request, Response } from "express";


class sesijaController {
    private sesijaServiceInstance: sesijaService;
    
    constructor(sesijaServiceInstance: sesijaService) {
        this.sesijaServiceInstance = sesijaServiceInstance;
    }

    async getAll(req: Request, res: Response) {

        this.sesijaServiceInstance.getAll(null).then(sesija => {
            res.send(sesija);
        }).catch(err => {
            res.status(500).send(err?.message);
        });

    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params.id;
        console.log(id);
        this.sesijaServiceInstance.getById(id, null).then(sesija => {
            res.send(sesija);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }

    async add(req: Request, res: Response) {
        const data: any = req.body;
        this.sesijaServiceInstance.add(data).then(sesija => {
            res.send(sesija);
        }).catch(err => {
            res.send(err);
        }); 
    }
}

export default sesijaController;
