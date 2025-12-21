// // src/cloudinary/cloudinary.module.ts
// import { Module } from '@nestjs/common';
// import { CloudinaryService } from './cloudinary.service';

// @Module({
//   imports: [ConfigModule.forRoot({
//   isGlobal: true,
// });
// ]
//   providers: [CloudinaryService],
//   exports: [CloudinaryService],
// })
// export class CloudinaryModule {}


// src/cloudinary/cloudinary.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
