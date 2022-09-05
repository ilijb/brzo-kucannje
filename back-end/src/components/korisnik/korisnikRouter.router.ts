import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import korisnikController from "./korisnikController.controller";
import korisnikService from "./korisnikService.service";
import * as express from "express";

class korisnikRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const korisnikServiceInstance: korisnikService = new korisnikService(resources.databaseConnection);

        const korisnikControllerInstance = new korisnikController(korisnikServiceInstance);

        application.get("/api/korisnik", korisnikControllerInstance.getAll.bind(korisnikControllerInstance));
        application.get("/api/korisnik/:id", korisnikControllerInstance.getById.bind(korisnikControllerInstance));
        application.post("/api/korisnik", korisnikControllerInstance.add.bind(korisnikControllerInstance));
    }
}

export default korisnikRouter;