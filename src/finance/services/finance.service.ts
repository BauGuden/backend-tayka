import { Injectable } from '@nestjs/common';
import { CreateFinanceDto, UpdateFinanceDto } from '../dto';

@Injectable()
export class FinanceService {
  create(createFinanceDto: CreateFinanceDto) {
    return 'This action adds a new finance';
  }

  findAll() {
    return `This action returns all finance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} finance`;
  }

  update(id: number, updateFinanceDto: UpdateFinanceDto) {
    return `This action updates a #${id} finance`;
  }

  remove(id: number) {
    return `This action removes a #${id} finance`;
  }
}
