import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import tekstService from "./tekstService.service";
import * as express from "express";
import tekstController from "./tekstController.controller";
import rankService from "../rank/rankService.service";
import korisnikService from "../korisnik/korisniKService.service";

class tekstRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const tekstServiceInstance: tekstService = new tekstService(resources.databaseConnection);
        const rankServiceInstance: rankService = new rankService(resources.databaseConnection);
        const korisnikServiceInstance: korisnikService = new korisnikService(resources.databaseConnection);

        const tekstControllerInstance = new tekstController(tekstServiceInstance, korisnikServiceInstance, rankServiceInstance);

        application.get("/api/tekst", tekstControllerInstance.getAll.bind(tekstControllerInstance));
        application.get("/api/tekst/kategorija/:id", tekstControllerInstance.getByCategoryId.bind(tekstControllerInstance));
        application.get("/api/tekst/:id", tekstControllerInstance.getById.bind(tekstControllerInstance));
        application.post("/api/tekst", tekstControllerInstance.add.bind(tekstControllerInstance));
    }
}

export default tekstRouter;