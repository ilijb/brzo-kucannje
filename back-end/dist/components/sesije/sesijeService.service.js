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
const sesijeModel_model_1 = require("./sesijeModel.model");
const DefaultsesijaAdapterOptions = {};
class sesijeService extends BaseService_1.default {
    tableName() {
        return "sesije";
    }
    adaptToModel(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new sesijeModel_model_1.default();
            model.sesija_id = data.sesija_id;
            model.korisnik_id = data.korisnik_id;
            model.tekst_id = data.tekst_id;
            model.brzina = data.brzina;
            return model;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.execute('INSERT INTO sesije (korisnik_id, tekst_id, brzina) VALUES (?, ?, ?)', [data.korisnik_id, data.tekst_id, data.brzina])
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const info = result;
                    const novaSesija_id = +((_a = info[0]) === null || _a === void 0 ? void 0 : _a.insertId);
                    const novaSesija = yield this.getById(novaSesija_id, {});
                    resolve(novaSesija);
                })).catch(err => {
                    reject(err);
                });
            });
        });
    }
}
exports.default = sesijeService;
//# sourceMappingURL=sesijeService.service.js.map