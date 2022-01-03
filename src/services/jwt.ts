import fs from 'fs';
import jwt from 'jsonwebtoken';

export const generarJwt = (body: any) => {
  const cuerpo = body;

  const privateKey = fs.readFileSync('./jwt.pem', 'utf8');

  const sign = jwt.sign(cuerpo, privateKey, {
    algorithm: 'RS256',
  });

  return sign;
};
