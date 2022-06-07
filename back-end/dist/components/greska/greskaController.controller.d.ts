import greskaService from "./greskaService.service";
import { Request, Response } from "express";
declare class greskaController {
    private greskaServiceInstance;
    constructor(greskaServiceInstance: greskaService);
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    add(req: Request, res: Response): Promise<void>;
}
export default greskaController;
