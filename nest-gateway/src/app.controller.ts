import { Controller, Get, Param, OnModuleInit, Inject } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { BalanceService } from './interface/balance.interface';

@Controller('balance')
export class AppController implements OnModuleInit {
  private balanceService: BalanceService;

  constructor(@Inject('BALANCE_PACKAGE') private client: ClientGrpc) {}

  // เมื่อ Module เริ่มทำงาน ให้ทำการเชื่อมต่อกับ gRPC Service
  onModuleInit() {
    this.balanceService = this.client.getService<BalanceService>('BalanceService');
  }

  @Get(':id')
  async getBalance(@Param('id') id: string) {
    console.log('NestJS calling Go via gRPC for user:', id);
    
    // เรียกใช้ Method ของ Go เหมือนเรียกฟังก์ชันปกติเลย!
    return this.balanceService.getBalance({ userId: id });
  }
}