import IConfig from "./IConfig.interface"

const DevConfig: IConfig = {
    server : {
        port: 10000
    }, 
    static : {
        index: false,
        dotfiles: "deny",
        cacheControl: true,
        etag: true,
        maxAge: 1000* 60* 60* 24,
        path: "./static",
        route: "/assets"
    }   
}

export default DevConfig;
