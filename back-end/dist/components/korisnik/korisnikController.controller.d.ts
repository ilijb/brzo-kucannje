import korisnikService from "./korisniKService.service";
import { Request, Response } from "express";
declare class korisnikController {
    private korisnikServiceInstance;
    constructor(korisnikServiceInstance: korisnikService);
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    add(req: Request, res: Response): Promise<void>;
}
export default korisnikController;
