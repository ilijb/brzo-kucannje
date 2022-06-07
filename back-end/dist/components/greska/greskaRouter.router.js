"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const greskaController_controller_1 = require("./greskaController.controller");
const greskaService_service_1 = require("./greskaService.service");
class greskaRouter {
    setupRoutes(application, resources) {
        const korisniciServiceInstance = new greskaService_service_1.default(resources.databaseConnection);
        const korisniciControllerInstance = new greskaController_controller_1.default(korisniciServiceInstance);
    }
}
exports.default = greskaRouter;
//# sourceMappingURL=greskaRouter.router.js.map