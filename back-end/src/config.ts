import { readFileSync } from "fs";
import IConfig from "./common/IConfig.interface";
import AuthRouter from "./components/auth/AuthRouter.router";
import greskaRouter from "./components/greska/greskaRouter.router";
import kategorijaRouter from "./components/kategorija/kategorijaRouter.router";
import korisniciRouter from "./components/korisnik/korisnikRouter.router";
import rankRouter from "./components/rank/rankRouter.router";
import sesijaRouter from "./components/sesija/sesijaRouter.router";
import tekstRouter from "./components/tekst/tekstRouter.router";

const DevConfig: IConfig = {
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
        user: "root",
        password: "root",
        database: "brzo_kucanje",
        charset: "utf8",
        timezone: "+01:00",
        supportBigNumbers: true,
    },
    routers: [
        new korisniciRouter(),
        new greskaRouter(),
        new sesijaRouter(),
        new rankRouter(),
        new kategorijaRouter(),
        new tekstRouter(),
        new AuthRouter(),
    ],
    auth: {
        user: {
            algorithm: "RS256",
            issuer: "PIiVT",
            tokens: {
                auth: {
                    duration: 60 * 60 * 24,
                    keys: {
                        public: readFileSync("./.keystore/app.public", "ascii"),
                        private: readFileSync("./.keystore/app.private", "ascii"),
                    },
                },
                refresh: {
                    duration: 60 * 60 * 24 * 60, // Za dev: 60 dana - inace treba oko mesec dana
                    keys: {
                        public: readFileSync("./.keystore/app.public", "ascii"),
                        private: readFileSync("./.keystore/app.private", "ascii"),
                    },
                },
            },
        },
        allowAllRoutesWithoutAuthTokens: false, // Samo dok traje razvoj front-end dela bez mogucnosti prijave
    },
};

export { DevConfig };
