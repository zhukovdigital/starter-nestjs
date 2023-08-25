import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
    @Prop({ id: Types.ObjectId })
    id: Types.ObjectId;
    @Prop()
    name: string;
    @Prop()
    ip: string[];
    @Prop()
    type: string;
    @Prop([
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ])
    users: [User];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
