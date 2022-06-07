import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResources from "../../common/IApplicationResources.interface";
import rankController from "./rankController.controller";
import rankService from "./rankService.service";

class rankRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const rankServiceInstance: rankService = new rankService(resources.databaseConnection);

        const rankControllerInstance = new rankController(rankServiceInstance);
        
        application.get("/rank", rankControllerInstance.getAll.bind(rankControllerInstance));
        application.get("/rank/:id", rankControllerInstance.getById.bind(rankControllerInstance));
        // application.post("/rank", rankControllerInstance.add.bind(rankControllerInstance));
    }
}
export default rankRouter;