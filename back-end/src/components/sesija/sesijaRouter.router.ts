import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResources from "../../common/IApplicationResources.interface";
import sesijaController from "./sesijaController.controller";
import sesijaService from "./sesijaService.service";

class sesijaRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const sesijaServiceInstance: sesijaService = new sesijaService(resources.databaseConnection);

        const sesijaControllerInstance = new sesijaController(sesijaServiceInstance);
        
        application.get("/api/sesija", sesijaControllerInstance.getAll.bind(sesijaControllerInstance));
        application.get("/api/sesija/:id", sesijaControllerInstance.getById.bind(sesijaControllerInstance));
        application.post("/api/sesija", sesijaControllerInstance.add.bind(sesijaControllerInstance));
    }
}
export default sesijaRouter;