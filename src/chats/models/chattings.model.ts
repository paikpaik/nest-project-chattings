import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Socket as SocketModel } from './sockets.model';
import { Types } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  //* collection은 디폴트가 있어서 안 적어두 됨. 자동으로 class를 소문자로 바꾸고 복수형으로 만들어줌.
  collection: 'chattings',
  timestamps: true,
};

@Schema(options)
export class Chatting extends Document {
  @Prop({
    type: {
      _id: { type: Types.ObjectId, requied: true, ref: 'sockets' },
      id: { type: String },
      username: { type: String, required: true },
    },
  })
  @IsNotEmpty()
  user: SocketModel;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  chat: string;
}

export const ChattingSchema = SchemaFactory.createForClass(Chatting);
