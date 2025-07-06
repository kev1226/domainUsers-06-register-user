import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { KafkaServices } from './kafka-constants';

export const kafkaClientConfig: ClientsModuleOptions = [
  {
    name: KafkaServices.USER_CREATE_SERVICE,
    transport: Transport.KAFKA,
    options: {
      client: { clientId: 'auth-service-create', brokers: ['3.232.44.31:9092'] },
      consumer: { groupId: 'auth-service-create-group' },
    },
  },
];
