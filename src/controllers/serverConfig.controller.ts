import { Request, Response } from 'express';
const numCpus = require('os').cpus().length;

class ServerConfigController {
  getServerInfo(req: Request, res: Response) {
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

export const serverConfigController = new ServerConfigController();
