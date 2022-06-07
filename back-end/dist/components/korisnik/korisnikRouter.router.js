"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const korisnikController_controller_1 = require("./korisnikController.controller");
const korisnikService_service_1 = require("./korisnikService.service");
class korisnikRouter {
    setupRoutes(application, resources) {
        const korisnikServiceInstance = new korisnikService_service_1.default(resources.databaseConnection);
        const korisnikControllerInstance = new korisnikController_controller_1.default(korisnikServiceInstance);
        application.get("/korisnik", korisnikControllerInstance.getAll.bind(korisnikControllerInstance));
        application.get("/korisnik/:id", korisnikControllerInstance.getById.bind(korisnikControllerInstance));
        application.post("/korisnik", korisnikControllerInstance.add.bind(korisnikControllerInstance));
    }
}
exports.default = korisnikRouter;
//# sourceMappingURL=korisnikRouter.router.js.map