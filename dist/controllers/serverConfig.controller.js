"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfigController = void 0;
const numCpus = require('os').cpus().length;
class ServerConfigController {
    getServerInfo(req, res) {
        let objeto = {
            cwd: process.cwd(),
            pid: process.pid,
            version: process.version,
            title: process.title,
            platform: process.platform,
            procesadores: numCpus,
            puerto: process.env.port,
            memory: JSON.stringify(process.memoryUsage()),
        };
        return res.render('serverConfig.pug', { objeto });
    }
}
exports.serverConfigController = new ServerConfigController();
