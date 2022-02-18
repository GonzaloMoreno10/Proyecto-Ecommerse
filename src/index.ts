import app from './services/server';
import log4js from 'log4js';

const consoleLogger = log4js.getLogger('consoleLogger');

app.listen(process.env.PORT || 8000, () =>
  consoleLogger.info(`Servidor express escuchando en el puerto ${process.env.PORT} - PID WORKER ${process.pid}`)
);
