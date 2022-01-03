import multer from 'multer';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    console.log(req);

    cb(null, './public/storage/imgs');
  },

  filename: function (req: any, file: any, cb: any) {
    console.log(req);
    let { userId } = req.params;
    console.log(userId);
    cb(null, userId + '.jpg');
  },
});

export const upload = multer({
  storage: storage,
});
