import { Test, TestingModule } from '@nestjs/testing';
import { RfmAnalysisController } from './rfm-analysis.controller';
import { RfmAnalysisService } from './rfm-analysis.service';

describe('RfmAnalysisController', () => {
  let controller: RfmAnalysisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RfmAnalysisController],
      providers: [RfmAnalysisService],
    }).compile();

    controller = module.get<RfmAnalysisController>(RfmAnalysisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
