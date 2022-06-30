import { Module } from '@nestjs/common';
import { RfmAnalysisService } from './rfm-analysis.service';
import { RfmAnalysisController } from './rfm-analysis.controller';

@Module({
  controllers: [RfmAnalysisController],
  providers: [RfmAnalysisService],
})
export class RfmAnalysisModule {}
