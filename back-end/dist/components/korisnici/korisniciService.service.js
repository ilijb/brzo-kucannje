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
exports.DefaultkorisniciAdapterOptions = void 0;
const BaseService_1 = require("../../common/BaseService");
const korisniciModel_model_1 = require("./korisniciModel.model");
const DefaultkorisniciAdapterOptions = {
    test: false,
};
exports.DefaultkorisniciAdapterOptions = DefaultkorisniciAdapterOptions;
class korisniciService extends BaseService_1.default {
    tableName() {
        return "korisnik";
    }
    adaptToModel(data, options = DefaultkorisniciAdapterOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const korisnik = new korisniciModel_model_1.default();
            korisnik.korisnik_id = +(data === null || data === void 0 ? void 0 : data.korisnik_id);
            korisnik.korisnicko_ime = data === null || data === void 0 ? void 0 : data.korisnicko_ime;
            korisnik.pw_hash = data === null || data === void 0 ? void 0 : data.pw_hash;
            korisnik.email = data === null || data === void 0 ? void 0 : data.email;
            korisnik.rank_id = +(data === null || data === void 0 ? void 0 : data.rank_id);
            return korisnik;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.execute('INSERT INTO korisnik (korisnicko_ime, pw_hash, email, rank_id) VALUES (?, ?, ?, ?)', [data.korisnicko_ime, data.pw_hash, data.email, data.rank_id])
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const info = result;
                    const noviKorisnik_id = +((_a = info[0]) === null || _a === void 0 ? void 0 : _a.insertId);
                    const noviKorisnik = yield this.getById(noviKorisnik_id, {});
                    resolve(noviKorisnik);
                })).catch(err => {
                    reject(err);
                });
            });
        });
    }
}
exports.default = korisniciService;
//# sourceMappingURL=korisniciService.service.js.map