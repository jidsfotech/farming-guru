import { Controller, Get, Param } from '@nestjs/common';
import { FarmService } from './farming.service';

@Controller('farming')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Get('categories')
  categories() {
    return this.farmService.categories();
  }

  @Get(':farmingType/details')
  details(@Param() params: { farmingType: string }) {
    return this.farmService.details(params);
  }
}
