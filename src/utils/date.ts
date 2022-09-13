const moment = require('moment');

export const FecAlt = function ():Date {

  return moment.tz(moment(), 'America/Rosario').format('YYYY-MM-DD HH:mm:ss');
};
export const FecMod = function ():Date {
  return moment.tz(moment(), 'America/Rosario').format('YYYY-MM-DD');
};
export const HorMod = function ():Date {
  return moment.tz(moment(), 'America/Rosario').format('HH:mm:ss');
};
