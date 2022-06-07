import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import tekstService from "./tekstService.service";
import * as express from "express";
import tekstController from "./tekstController.controller";

class tekstRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const tekstServiceInstance: tekstService = new tekstService(resources.databaseConnection);

        const tekstControllerInstance = new tekstController(tekstServiceInstance);

        application.get("/tekst", tekstControllerInstance.getAll.bind(tekstControllerInstance));
        application.get("/tekst/:id", tekstControllerInstance.getById.bind(tekstControllerInstance));
        application.post("/tekst", tekstControllerInstance.add.bind(tekstControllerInstance));
    }
}

export default tekstRouter;