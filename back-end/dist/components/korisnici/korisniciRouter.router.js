"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const korisniciController_controller_1 = require("./korisniciController.controller");
const korisniciService_service_1 = require("./korisniciService.service");
class korisniciRouter {
    setupRoutes(application, resources) {
        const korisniciServiceInstance = new korisniciService_service_1.default(resources.databaseConnection);
        const korisniciControllerInstance = new korisniciController_controller_1.default(korisniciServiceInstance);
        application.get("/korisnici", korisniciControllerInstance.getAll.bind(korisniciControllerInstance));
        application.get("/korisnici/:id", korisniciControllerInstance.getById.bind(korisniciControllerInstance));
        application.post("/korisnici", korisniciControllerInstance.add.bind(korisniciControllerInstance));
    }
}
exports.default = korisniciRouter;
//# sourceMappingURL=korisniciRouter.router.js.map