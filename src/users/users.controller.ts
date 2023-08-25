import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../schemas/user.schema';
import { Types } from 'mongoose';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get('user')
  getSingleUser(@Query('email') email: string): Promise<User | undefined> {
    return this.userService.findSingleUser(email);
  }

  @Post()
  createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data);
  }

  @Put('user')
  updateUser(@Body() data: User): Promise<User> {
    return this.userService.updateUser(data);
  }

  @Delete()
  deleteUser(
    @Query('id') id: Types.ObjectId,
    @Query('org_id') org_id: Types.ObjectId,
  ): Promise<User> {
    return this.userService.deleteUser(id, org_id);
  }
}
