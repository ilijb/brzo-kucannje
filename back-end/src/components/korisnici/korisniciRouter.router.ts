import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import korisniciController from "./korisniciController.controller";
import korisniciService from "./korisniciService.service";
import * as express from "express";

class korisniciRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const korisniciServiceInstance: korisniciService = new korisniciService(resources.databaseConnection);

        const korisniciControllerInstance = new korisniciController(korisniciServiceInstance);

        application.get("/korisnici", korisniciControllerInstance.getAll.bind(korisniciControllerInstance));
        application.get("/korisnici/:id", korisniciControllerInstance.getById.bind(korisniciControllerInstance));
        application.post("/korisnici", korisniciControllerInstance.add.bind(korisniciControllerInstance));
    }
}

export default korisniciRouter;