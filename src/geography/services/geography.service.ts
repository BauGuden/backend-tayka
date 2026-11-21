import { Injectable } from '@nestjs/common';
import { CreateGeographyDto, UpdateGeographyDto } from '../dto';

@Injectable()
export class GeographyService {
  create(createGeographyDto: CreateGeographyDto) {
    return 'This action adds a new geography';
  }

  findAll() {
    return `This action returns all geography`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geography`;
  }

  update(id: number, updateGeographyDto: UpdateGeographyDto) {
    return `This action updates a #${id} geography`;
  }

  remove(id: number) {
    return `This action removes a #${id} geography`;
  }
}
