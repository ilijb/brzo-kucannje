import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import greskaService from "./greskaService.service";
import * as express from "express";
import greskaController from "./greskaController.controller";

class greskaRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const greskaServiceInstance: greskaService = new greskaService(resources.databaseConnection);

        const greskaControllerInstance = new greskaController(greskaServiceInstance);

        application.get("/greska", greskaControllerInstance.getAll.bind(greskaControllerInstance));
        application.get("/greska/:id", greskaControllerInstance.getById.bind(greskaControllerInstance));
        application.post("/greska", greskaControllerInstance.add.bind(greskaControllerInstance));
    }
}

export default greskaRouter;