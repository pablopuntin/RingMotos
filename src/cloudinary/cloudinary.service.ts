import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      url: this.configService.get<string>('CLOUDINARY_URL'),
    });
  }

  async uploadImage(file: Express.Multer.File, publicId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'clients',
          public_id: publicId,
          overwrite: true,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error('Cloudinary result is undefined'));
          }
          resolve(result.secure_url);
        },
      );
      upload.end(file.buffer); // 👈 usamos el buffer
    });
  }
}
