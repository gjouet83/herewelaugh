const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/tif': 'tiff',
  'image/tiff': 'tiff',
  'image/png': 'png',
  'image/svg': 'svg',
  'image/gif': 'gif',
  'image/bmp': 'bmp',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/vnd.microsoft.icon': 'ico',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `medias/userId-${req.body.userId}`);
  },
  filename: (req, file, callback) => {
    //on crée l'extension grace au mimetypes
    const extension = MIME_TYPES[file.mimetype];
    //on crée un nom de fichier constitué du userId, de la date et de l'extention
    callback(
      null,
      'userId-' + req.body.userId + 'avatar' + Date.now() + '.' + extension
    );
  },
});

const uploadMedia = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      !file.originalname.match(
        /\.(jpeg|jpg|tif|tiff|png|svg|gif|bmp|webp|avif|ico)$/
      )
    ) {
      return callback(new Error('File is not valid'));
    }
    callback(undefined, true);
  },
});

module.exports = uploadMedia.single('media');
