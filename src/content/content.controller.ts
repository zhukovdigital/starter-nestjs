import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { Types } from 'mongoose';
import { Content } from '../../schemas/content.schema';

@Controller('api/content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get()
  getAllContentItems() {
    return this.contentService.getAllContentItems();
  }

  @Get('item')
  getSingleContentItem(@Query('id') id: Types.ObjectId) {
    return this.contentService.getSingleContentItem(id);
  }

  @Get('client')
  getContentItemsByClient(@Query('id') id: Types.ObjectId) {
    return this.contentService.getAllContentItemsByClient(id);
  }

  @Put()
  updateContentItem(@Body() data: Content) {
    return this.contentService.updateContentItem(data);
  }

  @Post()
  createContentItem(@Body() data: Content) {
    console.log(data);
    return this.contentService.createContentItem(data);
  }

  @Delete()
  deleteContentItem(@Query('id') id: Types.ObjectId) {
    return this.contentService.deleteContentItem(id);
  }
}
