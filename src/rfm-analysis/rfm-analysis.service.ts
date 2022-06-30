import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { join } from 'path';

@Injectable()
export class RfmAnalysisService {
  create(file: Express.Multer.File) {
    const rootProjectDir = join(__dirname, '../..');
    const wb = XLSX.readFile(join(rootProjectDir, file.path));
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const range = XLSX.utils.decode_range(sheet['!ref']);

    console.log('range', range);
  }
}
