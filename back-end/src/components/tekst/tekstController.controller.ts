import tekstService from "./tekstService.service";
import { Request, Response } from "express";


class tekstController {
    private tekstServiceInstance: tekstService;
    
    constructor(tekstServiceInstance: tekstService) {
        this.tekstServiceInstance = tekstServiceInstance;
    }

    async getAll(req: Request, res: Response) {

        this.tekstServiceInstance.getAll(null).then(tekst => {
            res.send(tekst);
        }).catch(err => {
            res.status(500).send(err?.message);
        });

    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params.id;
        this.tekstServiceInstance.getById(id, null).then(tekst => {
            const rows = tekst.tekst.split("||");
            res.send(rows);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }

    async add(req: Request, res: Response) {
        const data: any = req.body;
        this.tekstServiceInstance.add(data).then(tekst => {
            res.send(tekst);
        }).catch(err => {
            res.send(err);
        }); 
    }

    
    async getByCategoryId(req: Request, res: Response) {
        const id: number = +req.params.id;
        this.tekstServiceInstance.getAllByCategoryId(id, null).then(tekst => {
            res.send(tekst);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }
}

export default tekstController;
