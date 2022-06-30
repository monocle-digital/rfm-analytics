import { PartialType } from '@nestjs/mapped-types';
import { RfmInputDto } from './rfm-input-dto';

export class UpdateRfmAnalysisDto extends PartialType(RfmInputDto) {}
