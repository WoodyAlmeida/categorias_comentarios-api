import * as Settings from '../../settings';

const multer = require('multer');
const crypto = require("crypto");

function isValidExt(ext: string) {
  switch (ext) {
    case "bmp":
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "pdf":
    case "mp4":
    case "rar":
    case "zip":
    case "mov":
    case "avi":
    case "mp3":
    case "wav":
    case "doc":
    case "docx":
    case "ppt":
    case "pptx":
    case "xlsm":
    case "xls":
    case "rtf":
    case "txt": return true;

    default: return false;
  }
}

let storage = multer.diskStorage({
  destination: (req: any, file: any, callback: any) => {
    callback(null, './uploads/file');
  },
  filename: (req: any, file: any, callback: any) => {

    const id = Date.now() + '-' + crypto.randomBytes(64).toString("hex");
    const type = file.originalname.split('.');
    const ext = type[type.length - 1];

    file.type = ext;

    if (!isValidExt(ext)) {
      file.error = `INVALID_FILE`;
    }

    file.id = id + '.' + ext;
    callback(null, file.id);
  }
});
let upload = multer({ storage }).single('file');

export { upload };

export function UploadFile(app: any) {
  app.get('/file/:file', (req: any, res: any, err: any) => {
    try {
      let options = {
        root: './uploads/file',
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      };

      let fileName = req.params.file;
      res.sendFile(fileName, options, function (err: any) {
        if (err) {
          // Settings.logError(`Could not find specified file: ${fileName}.`);
          res.status(404).send();
        } else {
          //console.log('Sent:', fileName);
        }
      });

    } catch (err) {
      Settings.logError('Could not find specified file.');
    }

  });

  app.post('/upload/file', upload, (req: any, res: any, err: any) => {

    if (req.file.error) {
      res.json({
        error: req.file.error
      });
    } else {
      res.json({
        url: req.file.id
      });
    }

  });
}