import { Injectable } from '@nestjs/common';
import { CreateCommerceDto, UpdateCommerceDto } from '../dto';

@Injectable()
export class CommerceService {
  create(createCommerceDto: CreateCommerceDto) {
    return 'This action adds a new commerce';
  }

  findAll() {
    return `This action returns all commerce`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commerce`;
  }

  update(id: number, updateCommerceDto: UpdateCommerceDto) {
    return `This action updates a #${id} commerce`;
  }

  remove(id: number) {
    return `This action removes a #${id} commerce`;
  }
}
