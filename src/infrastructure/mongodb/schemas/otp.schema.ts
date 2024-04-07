import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Document & Otp;
@Schema({ collection: 'otps' }) // Set the collection name
export class Otp {
  @Prop({ required: true })
  userId: string; // Unique identifier for the user associated with the OTP

  @Prop({ required: true })
  otp: string; // The actual one-time password code

  @Prop({ required: true })
  secret: string; // Saved secret to use for verification in speakeasy

  @Prop({ required: true, default: Date.now })
  createdAt: number; // Timestamp of OTP generation

  @Prop({ required: true, index: { expires: '1m' } }) // Index with TTL for faster cleanup
  expiresAt: number; // Timestamp of OTP expiration (e.g., 5 minutes from creation)
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
