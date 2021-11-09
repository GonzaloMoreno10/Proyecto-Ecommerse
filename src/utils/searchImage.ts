import fs from 'fs/promises';
import * as path from 'path';

let dir = path.resolve(__dirname, '../../src/storage/imgs');

console.log(dir);

export const buscarImagen = async (userId: string) => {
  let images = await fs.readdir(dir);

  for (let i in images) {
    let image = images[i].split('.').slice(0, -1).join('.');
    if (image === '618a70292db69716ef9b8085') return images[i];
  }
};
