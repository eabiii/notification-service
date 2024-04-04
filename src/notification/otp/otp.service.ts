import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from '../../infrastructure/mongodb/schemas/otp.schema';
import { OtpDTO, OtpReturnDTO } from '../../models/otp/otp.dto';

import * as speakeasy from 'speakeasy';

@Injectable()
export class OtpService {
  private readonly otpLength = 6;

  constructor(@InjectModel(Otp.name) private readonly otpModel: Model<Otp>) {}

  async create(data: OtpDTO): Promise<OtpReturnDTO> {
    const secret = speakeasy.generateSecret({ length: this.otpLength });

    const base32Secret = secret.base32;
    const otp = speakeasy.totp({
      secret: base32Secret,
      encoding: 'base32',
    });
    const expiresAt = Date.now() + 5 * 60 * 1000; // Set expiration to 5 minutes
    const createdAt = Date.now();
    const newOtp = new this.otpModel({
      userId: data.userId,
      otp: base32Secret,
      createdAt,
      expiresAt,
      used: false,
    });
    await newOtp.save();
    return { userId: data.userId, otp };
  }
}
