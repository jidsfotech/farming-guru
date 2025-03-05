import { Module } from '@nestjs/common';
import { FarmController } from './farming.controller';
import { FarmService } from './farming.service';

@Module({
  controllers: [FarmController],
  providers: [FarmService],
  imports: [],
  exports: [FarmService],
})
export class FarmModule {}
