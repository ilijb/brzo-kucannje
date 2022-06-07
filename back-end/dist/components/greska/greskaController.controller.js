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
class greskaController {
    constructor(greskaServiceInstance) {
        this.greskaServiceInstance = greskaServiceInstance;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.greskaServiceInstance.getAll(null).then(greska => {
                res.send(greska);
            }).catch(err => {
                res.status(500).send(err === null || err === void 0 ? void 0 : err.message);
            });
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            console.log(id);
            this.greskaServiceInstance.getById(id, null).then(greska => {
                res.send(greska);
            }).catch(err => {
                res.send(err);
            });
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            this.greskaServiceInstance.add(data).then(greska => {
                res.send(greska);
            }).catch(err => {
                res.send(err);
            });
        });
    }
}
exports.default = greskaController;
//# sourceMappingURL=greskaController.controller.js.map