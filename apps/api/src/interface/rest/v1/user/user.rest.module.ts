import { UserServiceModule } from '@application/user/user.service.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [UserServiceModule],
  controllers: [UserController],
})
export class UserRestModule {}
