import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { User } from './user.entity';

export class UserDto implements Readonly<UserDto> {
  @IsUUID()
  public id: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public name: string;

  public static from(dto: Partial<UserDto>) {
    const user = new UserDto();
    user.id = dto.id;
    user.username = dto.username;
    user.password = dto.password;
    user.email = dto.email;
    user.name = dto.name;

    return user;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      username: entity.username,
      password: entity.password,
      email: entity.email,
      name: entity.name,
    });
  }

  public toEntity() {
    const user = new User(this.username, this.password, this.email, this.name);
    return user;
  }
}
