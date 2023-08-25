import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Client, ClientDocument } from '../../schemas/clients.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async findSingleUser(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new ForbiddenException(`User with your credentials don't exist`);
    }
    return user.populate('organization');
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().populate('organization');
  }

  async createUser(user: User): Promise<User> {
    const isExist = await this.userModel.findOne({ email: user.email });
    if (isExist) {
      throw new ForbiddenException('User with your credentials exist');
    }
    const client = await this.clientModel.findOne({
      name: user.organization,
    });
    if (!client) {
      throw new ForbiddenException('Client with this name don`t exist');
    }
    const createdUser = await new this.userModel({
      ...user,
      organization: client,
    }).populate('organization');
    await this.clientModel.findOneAndUpdate(
      { name: user.organization },
      {
        $addToSet: { users: (await createdUser)._id },
        new: true,
      },
    );
    return (await createdUser).save();
  }

  async updateUser(user: User): Promise<User> {
    const isExist = await this.userModel.findOne({ id: user.id });
    if (!isExist) {
      throw new ForbiddenException(`User with your credentials don't exist`);
    }
    return this.userModel
      .findByIdAndUpdate(new Types.ObjectId(user.id))
      .populate('organization');
  }

  async deleteUser(id: Types.ObjectId, org_id: Types.ObjectId): Promise<User> {
    const isExist = await this.userModel.findById(new Types.ObjectId(id));
    if (!isExist) {
      throw new ForbiddenException(`User with your credentials don't exist`);
    }
    await this.clientModel.findByIdAndUpdate(
      new Types.ObjectId(new Types.ObjectId(org_id)),
      {
        $pullAll: { users: [new Types.ObjectId(id)] },
      },
    );
    return this.userModel.findByIdAndDelete(id).populate('organization');
  }
}
