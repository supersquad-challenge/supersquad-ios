import { S3Client } from '@aws-sdk/client-s3';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import * as multerS3 from 'multer-s3';
import { extname } from 'path';
import * as moment from 'moment-timezone';

export const multerOptionsFactory = (foldername: string): MulterOptions => {
  return {
    storage: multerS3({
      s3: new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials: {
          accessKeyId: process.env.AWS_S3_ACCESS_KEY,
          secretAccessKey: process.env.AWS_S3_SECRET_KEY,
        },
      }),
      bucket: process.env.AWS_S3_BUCKET,
      //acl: 'public-read',
      contentType: (req, file, cb) => {
        cb(null, file.mimetype);
      },
      key(req: any, file, callback) {
        const ext = extname(file.originalname); // 확장자

        const userChallengeId = req.body.userChallengeId;
        const yymmdd = moment().format('YYMMDD-HHmmss');

        const fileName = `${foldername}/${userChallengeId}-${yymmdd}${ext}`;

        callback(null, fileName);
      },
    }),
  };
};
