import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from '../../schemas/clients.schema';
import { User, UserSchema } from '../../schemas/user.schema';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
})
export class ClientsModule {}
