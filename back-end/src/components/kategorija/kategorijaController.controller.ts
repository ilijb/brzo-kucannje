import kategorijaService from "./kategorijaService.service";
import { Request, Response } from "express";


class kategorijaController {
    private kategorijaServiceInstance: kategorijaService;
    
    constructor(kategorijaServiceInstance: kategorijaService) {
        this.kategorijaServiceInstance = kategorijaServiceInstance;
    }

    async getAll(req: Request, res: Response) {

        this.kategorijaServiceInstance.getAll(null).then(kategorija => {
            res.send(kategorija);
        }).catch(err => {
            res.status(500).send(err?.message);
        });

    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params.id;
        console.log(id);
        this.kategorijaServiceInstance.getById(id, null).then(kategorija => {
            res.send(kategorija);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }

    async add(req: Request, res: Response) {
        const data: any = req.body;
        this.kategorijaServiceInstance.add(data).then(kategorija => {
            res.send(kategorija);
        }).catch(err => {
            res.send(err);
        }); 
    }
}

export default kategorijaController;
