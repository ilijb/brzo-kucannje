"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevConfig = void 0;
const korisniciRouter_router_1 = require("./components/korisnici/korisniciRouter.router");
const DevConfig = {
    server: {
        port: 10000,
        static: {
            index: false,
            dotfiles: "deny",
            cacheControl: true,
            etag: true,
            maxAge: 1000 * 60 * 60 * 24,
            path: "./static",
            route: "/assets",
        },
    },
    logging: {
        path: "./logs",
        format: ":date[iso]\t:remote-addr\t:method\t:url\t:status\t:res[content-length] bytes\t:response-time ms",
        filename: "access.log",
    },
    database: {
        host: "localhost",
        port: 3306,
        user: "praktikum",
        password: "praktikum_pass",
        database: "brzo_kucanje",
        charset: "utf8",
        timezone: "+01:00",
        supportBigNumbers: true,
    },
    routers: [
        new korisniciRouter_router_1.default(),
    ]
};
exports.DevConfig = DevConfig;
//# sourceMappingURL=config.js.map