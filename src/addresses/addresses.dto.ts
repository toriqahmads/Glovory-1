import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Address } from './addresses.entity';

export class AddressDto implements Readonly<AddressDto> {
  @IsUUID()
  public id: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  public user_id: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public address: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public city: string;

  public static from(dto: Partial<AddressDto>) {
    const address = new AddressDto();
    address.id = dto.id;
    address.user_id = dto.user_id;
    address.address = dto.address;
    address.city = dto.city;

    return address;
  }

  public static fromEntity(entity: Address) {
    return this.from({
      id: entity.id,
      user_id: entity.user_id,
      address: entity.address,
      city: entity.city,
    });
  }

  public toEntity() {
    const user = new Address(this.user_id, this.address, this.city);
    return user;
  }
}
