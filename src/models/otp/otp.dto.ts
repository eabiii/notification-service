import { ApiProperty } from '@nestjs/swagger';

export class OtpDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  channel: string;
}

export class OtpReturnDTO {
  @ApiProperty()
  otp: string;
}

export class ValidateOtpDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  otp: string;
}
