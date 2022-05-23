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
class BaseService {
    constructor(databaseConnection) {
        this.database = databaseConnection;
    }
    get db() {
        return this.database;
    }
    getAll(options) {
        const tableName = this.tableName();
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM \`${tableName}\`;`;
            this.db.execute(sql)
                .then(([rows]) => __awaiter(this, void 0, void 0, function* () {
                if (rows === undefined) {
                    return resolve([]);
                }
                const items = [];
                for (const row of rows) {
                    items.push(yield this.adaptToModel(row, options));
                }
                resolve(items);
            }))
                .catch(error => {
                reject(error);
            });
        });
    }
    getById(id, options) {
        const tableName = this.tableName();
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM \`${tableName}\` WHERE ${tableName}_id = ?;`;
            this.db.execute(sql, [id])
                .then(([rows]) => __awaiter(this, void 0, void 0, function* () {
                if (rows === undefined) {
                    return resolve(null);
                }
                if (Array.isArray(rows) && rows.length === 0) {
                    return resolve(null);
                }
                resolve(yield this.adaptToModel(rows[0], options));
            }))
                .catch(error => {
                reject(error);
            });
        });
    }
    getAllByFieldNameAnValue(fieldName, value, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = this.tableName();
            return new Promise((resolve, reject) => {
                const sql = `SELECT * FROM \`${tableName}\` WHERE \`${fieldName}\` = ?;`;
                this.db.execute(sql, [value])
                    .then(([rows]) => __awaiter(this, void 0, void 0, function* () {
                    if (rows === undefined) {
                        return resolve([]);
                    }
                    const categories = [];
                    for (const row of rows) {
                        categories.push(yield this.adaptToModel(row, options));
                    }
                    resolve(categories);
                }))
                    .catch(error => {
                    reject(error);
                });
            });
        });
    }
}
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map