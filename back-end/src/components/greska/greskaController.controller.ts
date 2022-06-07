import greskaService from "./greskaService.service";
import { Request, Response } from "express";


class greskaController {
    private greskaServiceInstance: greskaService;
    
    constructor(greskaServiceInstance: greskaService) {
        this.greskaServiceInstance = greskaServiceInstance;
    }

    async getAll(req: Request, res: Response) {

        this.greskaServiceInstance.getAll(null).then(greska => {
            res.send(greska);
        }).catch(err => {
            res.status(500).send(err?.message);
        });

    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params.id;
        console.log(id);
        this.greskaServiceInstance.getById(id, null).then(greska => {
            res.send(greska);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }

    async add(req: Request, res: Response) {
        const data: any = req.body;
        this.greskaServiceInstance.add(data).then(greska => {
            res.send(greska);
        }).catch(err => {
            res.send(err);
        }); 
    }
}

export default greskaController;
