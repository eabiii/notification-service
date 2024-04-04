import { ApiProperty } from '@nestjs/swagger';

export class SmsDTO {
  @ApiProperty()
  body: string;

  @ApiProperty()
  to: string;
}
