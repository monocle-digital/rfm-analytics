import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { unlink } from 'fs';
import * as dfd from 'danfojs-node';

/**
 * References:
 * https://towardsdatascience.com/an-rfm-customer-segmentation-with-python-cf7be647733d
 * https://towardsdatascience.com/recency-frequency-monetary-model-with-python-and-how-sephora-uses-it-to-optimize-their-google-d6a0707c5f17
 */

const COL_INDEX = {
  InvoiceNo: 0,
  StockCode: 1,
  Description: 2,
  Quantity: 3,
  InvoiceDate: 4,
  UnitPrice: 5,
  CustomerID: 6,
  Country: 7,
};

@Injectable()
export class RfmAnalysisService {
  async create(file: Express.Multer.File) {
    const rootProjectDir = join(__dirname, '../..');
    const filePath = join(rootProjectDir, file.path);

    const df: dfd.DataFrame = (await dfd.readExcel(filePath)) as dfd.DataFrame;

    df.addColumn('TransactionValue', df['Quantity'].mul(df['UnitPrice']), {
      inplace: true,
    });

    df.print();

    const MAX_ROWS = 500;
    // Remove uploaded file
    unlink(filePath, (err) => {
      if (err) {
        Logger.error(err);
      }
      Logger.log(`${filePath} deleted`);
    });
  }
}
