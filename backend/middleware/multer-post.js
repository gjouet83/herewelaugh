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
  'video/3gpp': '3gp',
  'video/3gpp2': '3gpp2',
  'video/x-msvideo': 'avi',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpeg',
  'video/ogg': 'ogv',
  'video/mp2t': 'ts',
  'video/webm': 'webm',
  'video/x-flv': 'flv',
  'video/quicktime': 'mov',
  'video/x-ms-wmv': 'wmv',
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
      'userId-' + req.body.userId + 'posts' + Date.now() + '.' + extension
    );
  },
});

const uploadMedia = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      !file.originalname.match(
        /\.(jpeg|jpg|tif|tiff|png|svg|gif|bmp|webp|avif|ico|3gp|3gp2|avi|mp4|mpeg|ogv|ts|webm|flv|mov|wmv)$/
      )
    ) {
      return callback(new Error("Le fichier n'est pas valable."));
    }
    callback(undefined, true);
  },
});

module.exports = uploadMedia.single('media');
