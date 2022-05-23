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
const express = require("express");
const cors = require("cors");
const config_1 = require("./config");
const morgan = require("morgan");
const fs = require("fs");
const mysql2 = require("mysql2/promise");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = config_1.DevConfig;
        fs.mkdirSync(config.logging.path, {
            mode: 0o755,
            recursive: true,
        });
        const applicationResources = {
            databaseConnection: yield mysql2.createConnection({
                host: config.database.host,
                port: config.database.port,
                user: config.database.user,
                password: config.database.password,
                database: config.database.database,
                charset: config.database.charset,
                timezone: config.database.timezone,
                supportBigNumbers: config.database.supportBigNumbers,
            }),
        };
        const application = express();
        application.use(morgan(config.logging.format, {
            stream: fs.createWriteStream(config.logging.path + "/" + config.logging.filename, {
                flags: "a",
            }),
        }));
        application.use(cors());
        application.use(express.json());
        application.use(config.server.static.route, express.static(config.server.static.path, {
            index: config.server.static.index,
            dotfiles: config.server.static.dotfiles,
            cacheControl: config.server.static.cacheControl,
            etag: config.server.static.etag,
            maxAge: config.server.static.maxAge
        }));
        for (const router of config.routers) {
            router.setupRoutes(application, applicationResources);
        }
        application.use((req, res) => {
            res.sendStatus(404);
        });
        application.listen(config.server.port);
    });
}
process.on("unhandledRejection", (reason, p) => {
    console.log("Err prom", p, "razlog:", reason);
});
main();
//# sourceMappingURL=main.js.map