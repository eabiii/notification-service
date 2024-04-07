import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from '../../infrastructure/mongodb/schemas/otp.schema';
import { OtpDTO, OtpReturnDTO, ValidateOtpDTO } from '../../models/otp/otp.dto';

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
      otp: otp,
      secret: base32Secret,
      createdAt,
      expiresAt,
      used: false,
    });
    await newOtp.save();
    return otp;
  }

  async validate(data: ValidateOtpDTO): Promise<boolean> {
    try {
      const otp = await this.otpModel.findOne({
        userId: data.userId,
        otp: data.otp,
      });

      if (!otp) return false;

      const isValid = speakeasy.totp.verify({
        secret: otp.secret,
        encoding: 'base32',
        token: data.otp,
      });

      if (!isValid || otp.expiresAt < Date.now()) return false; // Invalid or expired

      return true;
    } catch (error) {
      return false;
    }
  }
}
