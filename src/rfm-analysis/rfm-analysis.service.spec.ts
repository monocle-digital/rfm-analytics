import { Test, TestingModule } from '@nestjs/testing';
import { RfmAnalysisService } from './rfm-analysis.service';

describe('RfmAnalysisService', () => {
  let service: RfmAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RfmAnalysisService],
    }).compile();

    service = module.get<RfmAnalysisService>(RfmAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
