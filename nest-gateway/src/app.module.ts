import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BALANCE_PACKAGE', // ชื่อที่เราจะใช้เรียกใน Service
        transport: Transport.GRPC,
        options: {
          package: 'balance', // ต้องตรงกับ package ในไฟล์ .proto
          protoPath: join(__dirname, '../../proto/balance.proto'), // ชี้ไปหาไฟล์ .proto
          url: 'localhost:50051', // URL ของ Go Server
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}