import { Module } from '@nestjs/common';
import { MaintenanceRequestModule } from '../maintenance-request/maintenance-request.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRequestModule } from './user-request/user-request.module';

@Module({
  imports: [MaintenanceRequestModule, UserRequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
