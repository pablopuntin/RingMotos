import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcountEntryService } from './acount-entry.service';
import { UpdateAcountEntryDto } from './dto/update-acount-entry.dto';
import { CreateAccountEntryDto } from './dto/create-acount-entry.dto';

@Controller('acount-entry')
export class AcountEntryController {
  constructor(private readonly acountEntryService: AcountEntryService) {}

  @Post()
  create(@Body() createAcountEntryDto: CreateAccountEntryDto) {
    return this.acountEntryService.create(createAcountEntryDto);
  }

  @Get()
  findAll() {
    return this.acountEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acountEntryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcountEntryDto: UpdateAcountEntryDto) {
    return this.acountEntryService.update(+id, updateAcountEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acountEntryService.remove(+id);
  }
}
