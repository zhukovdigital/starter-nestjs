import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from './clients.schema';

export type ContentDocument = HydratedDocument<Content>;

@Schema()
export class Content {
    @Prop({ id: Types.ObjectId })
    id: Types.ObjectId;
    @Prop()
    type: string;
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop({
        type: Types.ObjectId,
        ref: 'Client'
    })
    organizations: Client[];
    @Prop()
    updated: Date;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
