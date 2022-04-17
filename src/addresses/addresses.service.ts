import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './addresses.entity';
import { AddressDto } from './addresses.dto';

@Injectable()
export class AddressesService {
    constructor(@InjectRepository(Address) private readonly addressRepository: Repository<Address>) {}

    async findAll(): Promise<AddressDto[]> {
        try {
            const addresses = await this.addressRepository.find();

            return addresses.map((address) => AddressDto.fromEntity(address));
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async findByUserId(user_id: string): Promise<AddressDto[]> {
        try {
            const addresses = await this.addressRepository.find({
                where: { user_id: user_id }
            });

            return addresses.map((address) => AddressDto.fromEntity(address));
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async create(addressDto: AddressDto): Promise<AddressDto> {
        try {
            const address = await this.addressRepository.save(AddressDto.from(addressDto).toEntity());
            return AddressDto.fromEntity(address);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
