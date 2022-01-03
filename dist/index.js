"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const minimist_1 = __importDefault(require("minimist"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const log4js_1 = __importDefault(require("log4js"));
const argumentos = (0, minimist_1.default)(process.argv.slice(2));
const clusterMode = argumentos.cluster;
const numCPUs = os_1.default.cpus().length;
const consoleLogger = log4js_1.default.getLogger('consoleLogger');
if (clusterMode && cluster_1.default.isMaster) {
    consoleLogger.info('Ejecutando modo cluster');
    consoleLogger.info(`PID MASTER ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', worker => {
        consoleLogger.info(`Worker ${worker.process.pid} died at ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    const server = server_1.default.listen(server_1.default.get('port'), () => consoleLogger.info(`Servidor express escuchando en el puerto ${server_1.default.get('port')} - PID WORKER ${process.pid}`));
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        },
    });
    io.on('connection', socket => {
        console.log('connection made successfully');
        socket.on('msg', payload => {
            console.log('Message received on server: ', payload);
            io.emit('msg', payload);
        });
    });
}
