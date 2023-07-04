import {multiServer} from "./server";

const port = process.env.port || 4000;

multiServer(port);
