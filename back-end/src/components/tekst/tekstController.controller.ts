import tekstService from "./tekstService.service";
import { Request, Response } from "express";
import korisnikService from "../korisnik/korisniKService.service";
import rankService from "../rank/rankService.service";


class tekstController {
    private tekstServiceInstance: tekstService;
    private korisnikService: korisnikService;
    private rankService: rankService;
    
    constructor(tekstServiceInstance: tekstService, korisnikService: korisnikService, rankService: rankService) {
        this.tekstServiceInstance = tekstServiceInstance;
        this.korisnikService = korisnikService;
        this.rankService = rankService;
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
        const userId = +req.query.userId;
        this.tekstServiceInstance.getById(id, null).then(tekst => {
            const rows = tekst.tekst.split("||");
            this.korisnikService.getById(userId, null)
            .then(korisnik => {
                this.rankService.getById(korisnik.rank_id, null)
                .then(rank => {
                    res.send({
                        rows,
                        rank: rank.rank,
                        broj_sekundi: rank.broj_sekundi
                    });
                })
                .catch(err => {
                    res.send(err);
                })
            })
            .catch(err => {
                res.send(err);
            })
            
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
