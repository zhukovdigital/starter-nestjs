import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Content, ContentDocument } from '../../schemas/content.schema';
import { Client, ClientDocument } from '../../schemas/clients.schema';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<ContentDocument>,
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async getAllContentItems() {
    return this.contentModel
      .find()
      .populate({ path: 'organizations', model: 'Client' });
  }

  async getAllContentItemsByClient(org_id: Types.ObjectId) {
    const clientExist = this.contentModel.findById(org_id);
    if (!clientExist) {
      throw new ForbiddenException(`Client item with this id don't exist`);
    }
    return this.contentModel
      .find({
        organizations: org_id,
      })
      .populate({ path: 'organizations', model: 'Client' });
  }

  async getSingleContentItem(id: Types.ObjectId) {
    const item = await this.contentModel
      .findOne({ id })
      .populate('organizations');
    if (!item) {
      throw new ForbiddenException(`Content item with this id don't exist`);
    }
    return item;
  }

  async createContentItem(data: Content) {
    return (
      await this.contentModel.create({ ...data, updated: new Date() })
    ).populate('organizations');
  }

  async updateContentItem(data: Content) {
    const isExist = await this.contentModel
      .findOne({ id: data.id })
      .populate('organizations');
    if (isExist) {
      throw new ForbiddenException('Content item with this id exist');
    }
    return this.contentModel.findByIdAndUpdate(data.id, data);
  }

  async deleteContentItem(id: Types.ObjectId) {
    const isExist = await this.contentModel
      .findOne({ id })
      .populate('organizations');
    if (isExist) {
      throw new ForbiddenException('Content item with this id exist');
    }
    return this.contentModel.findByIdAndDelete(id).populate('organization');
  }
}
