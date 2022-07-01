import { Injectable, Logger } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { join } from 'path';
import { unlink } from 'fs';

/**
 * References:
 * https://towardsdatascience.com/an-rfm-customer-segmentation-with-python-cf7be647733d
 * https://towardsdatascience.com/recency-frequency-monetary-model-with-python-and-how-sephora-uses-it-to-optimize-their-google-d6a0707c5f17
 */

// interface LineItem {
//   invoiceNo: string;
//   stockCode: string;
//   quantity: number;
//   unitPrice: number;
//   totalPrice: number;
// }
// interface Transaction {
//   invoiceDate: Date;
//   invoiceNo: string;
//   lineItems: LineItem[];
// }
// interface RFM {
//   customerId: string;
//   transactions: Transaction[];
//   getMostRecentTransaction: () => Date;
//   getTotalTransactionValue: () => number;
//   getTransactionFrequency: () => number;
// }

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
  create(file: Express.Multer.File) {
    const rootProjectDir = join(__dirname, '../..');
    const filePath = join(rootProjectDir, file.path);
    const wb = XLSX.readFile(filePath);
    const sheet = wb.Sheets[wb.SheetNames[0]];

    const MAX_ROWS = 500;
    // TODO: If number of rows > MAX_ROWS return error
    const headers = [];
    const rows = [];
    let row;
    let rowNum;
    let colNum;
    const range = XLSX.utils.decode_range(sheet['!ref']);

    // Get Headers on 1st row
    for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
      const nextCell = sheet[XLSX.utils.encode_cell({ r: 0, c: colNum })];
      if (typeof nextCell === 'undefined') {
        headers.push(void 0);
      } else headers.push(nextCell.w);
    }
    // Get all rows after headers
    for (rowNum = 1; rowNum <= range.e.r; rowNum++) {
      row = {};
      for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
        const nextCell =
          sheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
        const propertyName = headers[colNum];
        if (typeof nextCell === 'undefined') {
          row[propertyName] = '';
        } else {
          row[propertyName] = nextCell.w;
        }
      }
      rows.push(row);
    }

    console.log(rows);

    // Aggregate by CustomerID

    // Remove uploaded file
    unlink(filePath, (err) => {
      if (err) {
        Logger.error(err);
      }
      Logger.log(`${filePath} deleted`);
    });
  }
}
