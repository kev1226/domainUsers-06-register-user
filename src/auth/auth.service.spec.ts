import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { KafkaServices } from '../kafka/kafka-constants';
import { KafkaTopics } from '../kafka/kafka-topics.enum';
import { ClientKafka } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('AuthService - register', () => {
  let service: AuthService;

  const mockKafkaClient = {
    send: jest.fn(),
    subscribeToResponseOf: jest.fn(),
    connect: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: KafkaServices.USER_CREATE_SERVICE,
          useValue: mockKafkaClient,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it(' debe registrar usuario correctamente', async () => {
    const dto = {
      name: ' Juan ',
      email: ' juan@email.com ',
      password: '123456 ',
    };

    const mockResponse = { data: { name: 'Juan', email: 'juan@email.com' } };

    mockKafkaClient.send.mockReturnValue(of(mockResponse));

    const result = await service.register(dto);

    expect(result).toEqual(mockResponse.data);
    expect(mockKafkaClient.send).toHaveBeenCalledWith(KafkaTopics.CREATE_USER, {
      name: 'Juan',
      email: 'juan@email.com',
      password: '123456',
    });
  });
});
