import * as express from "express";
import * as cors from "cors";
import IConfig from "./common/IConfig.interface";
import { DevConfig } from "./config";

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

application.use(config.server.static.route, express.static(config.server.static.path, {
    index: config.server.static.index,
    dotfiles: config.server.static.dotfiles,
    cacheControl: config.server.static.cacheControl,
    etag: config.server.static.etag,
    maxAge: config.server.static.maxAge
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