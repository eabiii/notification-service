import { ApiProperty } from '@nestjs/swagger';

export class OtpDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  channel: string;
}

export class OtpReturnDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  otp: string;
}

