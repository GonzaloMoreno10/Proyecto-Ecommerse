import multer from 'multer';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/storage/imgs');
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname + '.jpg');
  },
});

export const upload = multer({
  storage: storage,
});
