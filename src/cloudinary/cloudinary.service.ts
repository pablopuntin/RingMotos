// // src/cloudinary/cloudinary.service.ts
// import { Injectable } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';

// @Injectable()
// export class CloudinaryService {
//   async uploadImage(
//     file: Express.Multer.File,
//     publicId: string,
//   ): Promise<string> {
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder: 'clients',
//       public_id: publicId,
//       overwrite: true,
//       resource_type: 'image',
//     });

//     return result.secure_url;
//   }
// }

//refactor
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File, publicId: string): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'clients',
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    });
    return result.secure_url;
  }
}
