import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { RfmAnalysisService } from './rfm-analysis.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileMimetypeFilter, randomizeFilename } from 'src/utils';

@Controller('rfm-analysis')
export class RfmAnalysisController {
  constructor(private readonly rfmAnalysisService: RfmAnalysisService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomizedFilename = randomizeFilename(file);
          cb(null, randomizedFilename);
        },
      }),
      fileFilter: fileMimetypeFilter('csv', 'sheet', 'spreadsheetml'),
    }),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'received mime types: csv, xlsx',
        },
      },
    },
  })
  create(@UploadedFile() file: Express.Multer.File) {
    return this.rfmAnalysisService.create(file);
  }
}
