import { Module } from '@nestjs/common';
import { UserUsecase } from './user.usecase';

@Module({
  providers: [UserUsecase],
  exports: [UserUsecase],
})
export class UserUsecaseModule {}
