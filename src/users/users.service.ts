import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.userRepository.find();

      return users.map((user) => UserDto.fromEntity(user));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async create(userDto: UserDto): Promise<UserDto> {
    const user = await this.userRepository.save(UserDto.from(userDto).toEntity());
    return UserDto.fromEntity(user);
  }
}
