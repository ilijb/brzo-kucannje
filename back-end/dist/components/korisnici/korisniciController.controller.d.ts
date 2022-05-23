import korisniciService from "./korisniciService.service";
import { Request, Response } from "express";
declare class korisniciController {
    private korisniciServiceInstance;
    constructor(korisniciServiceInstance: korisniciService);
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    add(req: Request, res: Response): Promise<void>;
}
export default korisniciController;
