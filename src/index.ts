import * as express from "express";
import { AppDataSource } from "./data-source";
import cors = require("cors")
import helmet from "helmet";
import routes from "./routes";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    app.use('/', routes);

    app.listen(PORT, () => {
        console.log(`El servidor ha sido levantado en el puerto: ${PORT}`);
    });

}).catch(error => console.log(error));
