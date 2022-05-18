import * as express from "express";
import * as cors from "cors";
import IConfig from "./config/IConfig.interface";
import DevConfig from "./config/dev.config";

const config: IConfig = DevConfig;
const application: express.Application = express();

application.use(cors());
application.use(express.json());
// application.use('/assets', express.static("./static", {
//     index: false,
//     dotfiles: "deny",
//     cacheControl: true,
//     etag: true,
//     maxAge: 1000* 60* 60* 24
// }));

application.use(config.static.route, express.static(config.static.path, {
    index: config.static.index,
    dotfiles: config.static.dotfiles,
    cacheControl: config.static.cacheControl,
    etag: config.static.etag,
    maxAge: config.static.maxAge
}));


application.get('/about', (req,res) => {
    res.send([{
        message: 'About'
    },
    {
        message: 'About'
    }]
    )
}
);

application.use( (req, res) => {
    res.sendStatus(404);
}
);

application.listen(config.server.port)