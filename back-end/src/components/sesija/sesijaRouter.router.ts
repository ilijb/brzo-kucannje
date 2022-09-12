import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResources from "../../common/IApplicationResources.interface";
import sesijaController from "./sesijaController.controller";
import sesijaService from "./sesijaService.service";
import tekstService from "../tekst/tekstService.service";
import rankService from "../rank/rankService.service";
import korisnikService from "../korisnik/korisniKService.service";

class sesijaRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const sesijaServiceInstance: sesijaService = new sesijaService(resources.databaseConnection);
        const tekstServiceInstance: tekstService = new tekstService(resources.databaseConnection);
        const rankServiceInstance: rankService = new rankService(resources.databaseConnection);
        const korisnikServiceInstance: korisnikService = new korisnikService(resources.databaseConnection);

        const sesijaControllerInstance = new sesijaController(sesijaServiceInstance, tekstServiceInstance, rankServiceInstance, korisnikServiceInstance);
        
        application.get("/api/sesija", sesijaControllerInstance.getAll.bind(sesijaControllerInstance));
        application.get("/api/sesija/statistika/:id", sesijaControllerInstance.getStatistics.bind(sesijaControllerInstance));
        application.get("/api/sesija/:id", sesijaControllerInstance.getById.bind(sesijaControllerInstance));
        application.post("/api/sesija", sesijaControllerInstance.add.bind(sesijaControllerInstance));

    }
}
export default sesijaRouter;