import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Client, ClientDocument } from '../../schemas/clients.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModule: Model<ClientDocument>,
  ) {}

  async createClient(payload: Client): Promise<Client> {
    const client = await this.clientModule.findOne({ name: payload.name });
    if (client) {
      throw new ForbiddenException(`Client with your credentials exist`);
    }
    return this.clientModule.create(payload);
  }

  async findSingleClient(id: Types.ObjectId): Promise<Client> {
    const client = await this.clientModule.findById(id);
    if (!client) {
      throw new ForbiddenException(`Client with your credentials don't exist`);
    }
    return client.populate({ path: 'users', model: 'User' });
  }

  async findAllClients(): Promise<Client[]> {
    return this.clientModule.find().populate({ path: 'users', model: 'User' });
  }

  async updateClient(payload: Client): Promise<Client> {
    const client = await this.clientModule.findOne(
      new Types.ObjectId(payload.id),
    );
    if (!client) {
      throw new ForbiddenException(`Client with your credentials don't exist`);
    }
    return this.clientModule
      .findByIdAndUpdate(payload.id, payload)
      .populate({ path: 'users', model: 'User' });
  }

  async deleteClient(id: Types.ObjectId): Promise<Client> {
    const client = await this.clientModule.findOne(new Types.ObjectId(id));
    if (!client) {
      throw new ForbiddenException(`Client with id don't exist`);
    }
    return this.clientModule
      .findByIdAndDelete(new Types.ObjectId(id))
      .populate({ path: 'users', model: 'User' });
  }
}
