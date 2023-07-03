import * as http from 'http';
import handlers from './handlers';
import cluster from "cluster";
import { availableParallelism } from "os";


const server = http.createServer(handlers);
export default server;

export function multiServer(port: string | number) {
    if (cluster.isPrimary) {
        const cores = availableParallelism() - 1;
        const ports: number[] = [];
        for (let i = 0; i < cores; i++) {
            let workerPort = Number(port) + 1 + i;
            cluster.fork({ WORKER_PORT: workerPort });
            ports.push(workerPort);
        }

        let next = 0;

        const multiServer = http.createServer((req, res) => {
            multiServer.on("error", (error) => {
                console.log(error.message);
            });
            console.log(`This is request ${req.method}: ${req.url} to Multi Server`);
            next = (next + 1) % ports.length;
            const availablaPort = Number(port) + next;
            try {
                const reqToAvailblePort = http.request(
                    {
                        hostname: "localhost",
                        path: req.url,
                        method: req.method,
                        headers: req.headers,
                        port: availablaPort,
                    },
                    (response) => {
                        res.writeHead(
                            response.statusCode ?? 200,
                            response.statusMessage,
                            response.headers
                        );
                        response.pipe(res);
                    }
                );
                reqToAvailblePort.on("error", (error) => {
                    console.log(error.message);
                    req.unpipe(reqToAvailblePort);
                });

                console.log(`Server on port ${availablaPort} is answering`);

                req.pipe(reqToAvailblePort);
            } catch (error) {
                console.log(error);
            }
        });
        multiServer.listen(port, () => {
            console.log(`Multi Server is running on port ${port}`);
        });
    } else {
        let workerPort = process.env.WORKER_PORT? Number(process.env.WORKER_PORT): 4001;
        server.listen(workerPort);
    }
};
