import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import accountsRoutes from "./routes/accounts.js"
import { apiErrorHandler } from "./error/api-error-handler.js"

const app = express();


app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.use('/accounts', accountsRoutes);

app.use(apiErrorHandler);

export default app;
