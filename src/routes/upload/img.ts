const multer = require('multer');
const crypto = require("crypto");
import * as Settings from '../../settings';

let storage = multer.diskStorage({
    destination: (req: any, file: any, callback: any) => {
        callback(null, './uploads/img');
    },
    filename: (req: any, file: any, callback: any) => {
        const id = Date.now() + '-' + crypto.randomBytes(64).toString("hex");
        const type = file.mimetype.split('/');
        const ext = type[type.length-1];

        file.id = id + '.' + ext;
        callback(null,  file.id);
    }
});
let upload = multer({storage}).single('file');

export function UploadImg(app: any){
    app.get('/img/:file', (req: any, res: any, err: any) => {

        let options = {
            root: './uploads/img',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        let fileName = req.params.file;
        res.sendFile(fileName, options, function (err: any) {
          if (err) {
            Settings.logError(err.message);
            res.status(404).send();
          } else {
            //console.log('Sent:', fileName);
          }
        });

    });

    app.post('/upload/img', upload, (req: any, res: any, err: any) => {

        res.json({
            url: req.file.id
        });

    });
}