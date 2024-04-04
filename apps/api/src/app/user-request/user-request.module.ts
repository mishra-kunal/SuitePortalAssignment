import { Module } from '@nestjs/common';
import { UserRequestController } from './user-request.controller';
import { UserRequestDao } from './user-request.dao';
import { UserRequestService } from './user-request.service';


@Module({
  imports: [],
  controllers: [UserRequestController],
  providers: [
    UserRequestService,
    UserRequestDao,
  ],
})
export class UserRequestModule {}
