import { Test, TestingModule } from '@nestjs/testing';
import { ClicksendService } from './clicksend.service';

describe('ClicksendService', () => {
  let service: ClicksendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClicksendService],
    }).compile();

    service = module.get<ClicksendService>(ClicksendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
