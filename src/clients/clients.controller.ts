import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Client } from '../../schemas/clients.schema';
import { ClientsService } from './clients.service';
import { Types } from 'mongoose';

@Controller('api/clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Get()
  getAllClients(): Promise<Client[]> {
    return this.clientService.findAllClients();
  }

  @Get('client')
  getSingleClient(@Query('id') id: Types.ObjectId): Promise<Client> {
    return this.clientService.findSingleClient(id);
  }

  @Post()
  createUser(@Body() data: Client): Promise<Client> {
    return this.clientService.createClient(data);
  }

  @Put('client')
  updateClient(@Body() data: Client): Promise<Client> {
    return this.clientService.updateClient(data);
  }

  @Delete()
  deleteUser(@Query('id') id: Types.ObjectId): Promise<Client> {
    return this.clientService.deleteClient(id);
  }
}
