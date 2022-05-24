import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import korisnikController from "./korisnikController.controller";
import korisnikService from "./korisnikService.service";
import * as express from "express";

class korisnikRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const korisniciServiceInstance: korisnikService = new korisnikService(resources.databaseConnection);

        const korisniciControllerInstance = new korisnikController(korisniciServiceInstance);

        application.get("/korisnici", korisniciControllerInstance.getAll.bind(korisniciControllerInstance));
        application.get("/korisnici/:id", korisniciControllerInstance.getById.bind(korisniciControllerInstance));
        application.post("/korisnici", korisniciControllerInstance.add.bind(korisniciControllerInstance));
    }
}

export default korisnikRouter;