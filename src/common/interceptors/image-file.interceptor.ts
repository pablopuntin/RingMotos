// src/common/interceptors/image-file.interceptor.ts
import {
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export const ImageFileInterceptor = () =>
  FileInterceptor('file', {
    fileFilter: (_, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return cb(
          new BadRequestException('Solo imágenes JPG o PNG'),
          false,
        );
      }
      cb(null, true);
    },
    limits: {
      fileSize: 3 * 1024 * 1024 // 3MB
    }
  });
