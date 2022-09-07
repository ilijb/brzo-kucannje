import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import tekstService from "./tekstService.service";
import * as express from "express";
import tekstController from "./tekstController.controller";

class tekstRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const tekstServiceInstance: tekstService = new tekstService(resources.databaseConnection);

        const tekstControllerInstance = new tekstController(tekstServiceInstance);

        application.get("/api/tekst", tekstControllerInstance.getAll.bind(tekstControllerInstance));
        application.get("/api/tekst/kategorija/:id", tekstControllerInstance.getByCategoryId.bind(tekstControllerInstance));
        application.get("/api/tekst/:id", tekstControllerInstance.getById.bind(tekstControllerInstance));
        application.post("/api/tekst", tekstControllerInstance.add.bind(tekstControllerInstance));
    }
}

export default tekstRouter;