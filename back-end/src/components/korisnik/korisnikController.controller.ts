import korisnikService, { DefaultkorisnikAdapterOptions } from "./korisniKService.service";
import { Request, Response } from "express";


class korisnikController {
    private korisnikServiceInstance: korisnikService;
    
    constructor(korisnikServiceInstance: korisnikService) {
        this.korisnikServiceInstance = korisnikServiceInstance;
    }

    async getAll(req: Request, res: Response) {

        this.korisnikServiceInstance.getAll(DefaultkorisnikAdapterOptions).then(korisnik => {
            res.send(korisnik);
        }).catch(err => {
            res.status(500).send(err?.message);
        });

    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params.id;
        console.log(id);
        this.korisnikServiceInstance.getById(id, DefaultkorisnikAdapterOptions).then(korisnik => {
            res.send(korisnik);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }

    async add(req: Request, res: Response) {
        const data: any = req.body;
        this.korisnikServiceInstance.add(data).then(korisnik => {
            res.send(korisnik);
        }).catch(err => {
            res.send(err);
        }); 
    }
}

export default korisnikController;
