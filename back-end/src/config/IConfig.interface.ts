interface IConfig {
    server: {
        port: number;
    },
    static: {
        index: string | false;
        dotfiles: "deny";
        cacheControl: boolean;
        etag: boolean;
        maxAge: number;
        route: string;
        path: string;
    }
}

export default IConfig;