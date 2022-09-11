import sesijaService from "./sesijaService.service";
import { Request, Response } from "express";
import tekstService from "../tekst/tekstService.service";
import korisnikService from "../korisnik/korisniKService.service";
import tekstModel from "../tekst/tekstModel.model";
import rankService from "../rank/rankService.service";


class sesijaController {
    private sesijaServiceInstance: sesijaService;
    private tekstServiceInstance: tekstService;
    private rankServiceInstance: rankService;
    private korisnikServiceInstance: korisnikService;
    
    constructor(sesijaServiceInstance: sesijaService, tekstServiceInstance: tekstService, rankServiceInstance: rankService, korisnikServiceInstance: korisnikService) {
        this.sesijaServiceInstance = sesijaServiceInstance;
        this.tekstServiceInstance = tekstServiceInstance;
        this.rankServiceInstance = rankServiceInstance;
        this.korisnikServiceInstance = korisnikServiceInstance;
    }

    async getAll(req: Request, res: Response) {
        const korisnik_id = +req.query.userId;
        if (korisnik_id) {
            this.sesijaServiceInstance.getAllByUser(korisnik_id, null).then(sesije => {
                const sesijeSaNazivomTeksta = [];
                this.tekstServiceInstance.getAll(null).then(tekstovi => {
                    sesije.forEach(sesija => {
                        const tekst = tekstovi.find(tekst => tekst.tekst_id === sesija.tekst_id);
                        sesijeSaNazivomTeksta.push({
                            ...sesija,
                            tekst_naslov: tekst.naslov
                        })
                    })

                    res.send(sesijeSaNazivomTeksta);
                })
                .catch(err => {
                    res.status(500).send(err?.message);    
                })
            }).catch(err => {
                res.status(500).send(err?.message);
            });
        } else {
            this.sesijaServiceInstance.getAll(null).then(sesije => {
                res.send(sesije);
            }).catch(err => {
                res.status(500).send(err?.message);
            });
        }
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

            this.sesijaServiceInstance.getAllByUser(sesija.korisnik_id, null)
            .then(sesije => {
                let zbir_brzina: number = 0;
                
                if (sesije.length >= 10) {
                    sesije = sesije.slice(0, 9);
                }

                sesije.forEach(s => {
                    zbir_brzina += s.brzina;
                });

                zbir_brzina += sesija.brzina;
                
                const prosek = zbir_brzina / 10;
                this.rankServiceInstance.getAll(null)
                .then(ranks => {
                    let rank_za_korisnika = null;
                    ranks.forEach(rank => {
                        if (prosek >= rank.opseg_pocetak && prosek <= rank.opseg_kraj) {
                            rank_za_korisnika = rank;
                        }
                    })
                    this.korisnikServiceInstance.setNewRank(sesija.korisnik_id, rank_za_korisnika.rank_id).then(d => {
                        res.send(sesija);
                    })
                    .catch(err => {
                        res.send(err);    
                    });
                })
                .catch(err => {
                    res.send(err);    
                })

            })
            .catch(err => {
                res.send(err);    
            })

            
        }).catch(err => {
            res.send(err);
        }); 
    }
}

export default sesijaController;
