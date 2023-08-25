import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from '../../schemas/content.schema';
import { Client, ClientSchema } from '../../schemas/clients.schema';

@Module({
  controllers: [ContentController],
  providers: [ContentService],
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
})
export class ContentModule {}
