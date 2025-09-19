import { User } from '@domain/user/user.entity';
import type { UserRepository } from '@domain/user/user.repository';
import { USER_REPOSITORY } from '@domain/user/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(name: string, email: string) {
    const user = new User({ name, email });
    return await this.userRepository.create(user);
  }

  async getUserById(id: string) {
    return await this.userRepository.findById(id);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
