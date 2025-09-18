import { Body, Controller, Get, Post as HttpPost, Param } from '@nestjs/common';
import type { UserUsecase } from '@usecase/user/user.usecase';
import type { CreateUserDto } from './dto/create-user.dto';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userUsecase: UserUsecase) {}

  @HttpPost()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userUsecase.createUser(
      createUserDto.name,
      createUserDto.email,
    );
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userUsecase.getUserById(id);
  }

  @Get()
  async getAllUsers() {
    return await this.userUsecase.getAllUsers();
  }
}
