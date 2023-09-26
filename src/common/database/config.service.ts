import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configDatabase = this.configService.get('database');
    return {
      ...configDatabase,
      autoLoadEntities: true,
      logging: true,
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    };
  }
}
