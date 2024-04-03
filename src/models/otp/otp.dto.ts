import { ApiProperty } from '@nestjs/swagger';

export class OtpDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  channel: string;
}
