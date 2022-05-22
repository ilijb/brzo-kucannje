import IConfig from "./common/IConfig.interface";

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
        user: "praktikum",
        password: "praktikum_pass",
        database: "brzo_kucanje",
        charset: "utf8",
        timezone: "+01:00",
        supportBigNumbers: true,
    },
    routers: [
    ]
};

export { DevConfig };
