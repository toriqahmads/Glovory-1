import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressDto } from './addresses.dto';
import { AddressesService } from './addresses.service';

@Controller('addresses')
export class AddressesController {
    constructor(private readonly addressService: AddressesService) {}

    @Get()
    async findAll(): Promise<AddressDto[]> {
        return this.addressService.findAll();
    }

    @Get('/:user_id/user')
    async findByUserId(@Param('user_id') user_id: string): Promise<AddressDto[]> {
        return this.addressService.findByUserId(user_id);
    }

    @Post()
    async create(@Body() addressDto: AddressDto): Promise<AddressDto> {
        return this.addressService.create(addressDto);
    }
}
