import multer from 'multer';
import mimeTypes from 'mime-types';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/storage/imgs');
  },

  filename: function (req: any, file: any, cb: any) {
    let user = Object.assign(req.user);
    cb(null, user._id + '.jpg');
  },
});

export const upload = multer({
  storage: storage,
});
