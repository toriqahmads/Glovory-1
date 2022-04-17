import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmModuleOptions } from './config/orm.config';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), UsersModule, AddressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
