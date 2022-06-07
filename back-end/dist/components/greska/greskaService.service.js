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
const BaseService_1 = require("../../common/BaseService");
const greskaModel_model_1 = require("./greskaModel.model");
class greskaService extends BaseService_1.default {
    tableName() {
        return "greska";
    }
    adaptToModel(data, options = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const greska = new greskaModel_model_1.default();
            greska.greska_id = data.greska_id;
            greska.greska = data.greska;
            greska.vreme_ispravke = data.vreme_ispravke;
            greska.sesija_id = data.sesija_id;
            return greska;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.execute('INSERT INTO greska (greska_id, greska, vreme_ispravke, sesija_id) VALUES (?, ?, ?, ?)', [data.korisnicko_ime, data.pw_hash, data.email, data.rank_id])
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const info = result;
                    const greska_id = +((_a = info[0]) === null || _a === void 0 ? void 0 : _a.insertId);
                    const greska = yield this.getById(greska_id, {});
                    resolve(greska);
                })).catch(err => {
                    reject(err);
                });
            });
        });
    }
}
exports.default = greskaService;
//# sourceMappingURL=greskaService.service.js.map