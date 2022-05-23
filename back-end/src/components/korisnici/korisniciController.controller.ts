import korisniciService, { DefaultkorisniciAdapterOptions } from "./korisniciService.service";
import { Request, Response } from "express";


class korisniciController {
    private korisniciServiceInstance: korisniciService;
    
    constructor(korisniciServiceInstance: korisniciService) {
        this.korisniciServiceInstance = korisniciServiceInstance;
    }

    async getAll(req: Request, res: Response) {

        this.korisniciServiceInstance.getAll(DefaultkorisniciAdapterOptions).then(korisnici => {
            res.send(korisnici);
        }).catch(err => {
            res.status(500).send(err?.message);
        });

    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params.id;
        console.log(id);
        this.korisniciServiceInstance.getById(id, DefaultkorisniciAdapterOptions).then(korisnik => {
            res.send(korisnik);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }

    async add(req: Request, res: Response) {
        const data: any = req.body;
        this.korisniciServiceInstance.add(data).then(korisnik => {
            res.send(korisnik);
        }).catch(err => {
            res.send(err);
        }); 
    }
}

export default korisniciController;
