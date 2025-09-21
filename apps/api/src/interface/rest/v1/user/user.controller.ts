import type { UserService } from '@application/user/user.service';
import type { User } from '@domain/user/user.entity';
import { Body, Controller, Get, Post as HttpPost, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpPost()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(
      createUserDto.name,
      createUserDto.email,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiOkResponse({ description: 'Return the user with the specified ID.' })
  async getUser(@Param('id') id: string): Promise<User | null> {
    return await this.userService.getUserById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Return all users.' })
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
