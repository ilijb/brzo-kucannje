"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const korisniciService_service_1 = require("./korisniciService.service");
class korisniciController {
    constructor(korisniciServiceInstance) {
        this.korisniciServiceInstance = korisniciServiceInstance;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.korisniciServiceInstance.getAll(korisniciService_service_1.DefaultkorisniciAdapterOptions).then(korisnici => {
                res.send(korisnici);
            }).catch(err => {
                res.status(500).send(err === null || err === void 0 ? void 0 : err.message);
            });
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            console.log(id);
            this.korisniciServiceInstance.getById(id, korisniciService_service_1.DefaultkorisniciAdapterOptions).then(korisnik => {
                res.send(korisnik);
            }).catch(err => {
                res.send(err);
            });
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            this.korisniciServiceInstance.add(data).then(korisnik => {
                res.send(korisnik);
            }).catch(err => {
                res.send(err);
            });
        });
    }
}
exports.default = korisniciController;
//# sourceMappingURL=korisniciController.controller.js.map