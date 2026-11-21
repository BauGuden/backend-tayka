import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdentityService } from './services';
import { CreateIdentityDto, UpdateIdentityDto } from './dto';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post()
  create(@Body() createIdentityDto: CreateIdentityDto) {
    return this.identityService.create(createIdentityDto);
  }

  @Get()
  findAll() {
    return this.identityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.identityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdentityDto: UpdateIdentityDto) {
    return this.identityService.update(+id, updateIdentityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.identityService.remove(+id);
  }
}
