const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/svg': 'svg',
  'image/gif': 'gif',
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

module.exports = multer({ storage: storage }).single('image');
