import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../interfaces/global';
import { Client } from './clients.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ id: Types.ObjectId })
    id: Types.ObjectId;
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop({ required: [true, 'Role is required'] })
    role: UserRoles;
    @Prop({
        unique: [true, 'Duplicated email'],
        required: [true, 'Email is required']
    })
    email: string;
    @Prop({
        type: Types.ObjectId,
        ref: 'Client',
        require: [true, 'Organization id is required']
    })
    organization: Client;
}

export const UserSchema = SchemaFactory.createForClass(User);
