import * as express from "express";
import * as cors from "cors";
import IConfig from "./config/IConfig.interface";
import DevConfig from "./config/dev.config";

const config: IConfig = DevConfig;
const application: express.Application = express();

application.use(cors());
application.use(express.json());

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