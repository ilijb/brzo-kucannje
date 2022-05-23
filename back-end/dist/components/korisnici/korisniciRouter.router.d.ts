import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import * as express from "express";
declare class korisniciRouter implements IRouter {
    setupRoutes(application: express.Application, resources: IApplicationResources): void;
}
export default korisniciRouter;
