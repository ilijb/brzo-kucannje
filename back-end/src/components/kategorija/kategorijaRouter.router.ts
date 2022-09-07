import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import kategorijaService from "./kategorijaService.service";
import * as express from "express";
import kategorijaController from "./kategorijaController.controller";

class kategorijaRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const kategorijaServiceInstance: kategorijaService = new kategorijaService(resources.databaseConnection);

        const kategorijaControllerInstance = new kategorijaController(kategorijaServiceInstance);

        application.get("/api/kategorija", kategorijaControllerInstance.getAll.bind(kategorijaControllerInstance));
        application.get("/api/kategorija/:id", kategorijaControllerInstance.getById.bind(kategorijaControllerInstance));
        application.post("/api/kategorija", kategorijaControllerInstance.add.bind(kategorijaControllerInstance));
    }
}

export default kategorijaRouter;