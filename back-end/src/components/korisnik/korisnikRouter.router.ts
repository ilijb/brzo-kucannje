import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import korisnikController from "./korisnikController.controller";
import korisnikService from "./korisnikService.service";
import * as express from "express";

class korisnikRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const korisnikServiceInstance: korisnikService = new korisnikService(resources.databaseConnection);

        const korisnikControllerInstance = new korisnikController(korisnikServiceInstance);

        application.get("/korisnik", korisnikControllerInstance.getAll.bind(korisnikControllerInstance));
        application.get("/korisnik/:id", korisnikControllerInstance.getById.bind(korisnikControllerInstance));
        application.post("/korisnik", korisnikControllerInstance.add.bind(korisnikControllerInstance));
    }
}

export default korisnikRouter;