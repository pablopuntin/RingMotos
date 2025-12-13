import { Injectable } from '@nestjs/common';
import { CreateAcountEntryDto } from './dto/create-acount-entry.dto';
import { UpdateAcountEntryDto } from './dto/update-acount-entry.dto';

@Injectable()
export class AcountEntryService {
  create(createAcountEntryDto: CreateAcountEntryDto) {
    return 'This action adds a new acountEntry';
  }

  findAll() {
    return `This action returns all acountEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} acountEntry`;
  }

  update(id: number, updateAcountEntryDto: UpdateAcountEntryDto) {
    return `This action updates a #${id} acountEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} acountEntry`;
  }
}
