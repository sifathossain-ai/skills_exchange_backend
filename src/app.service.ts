import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configServer: ConfigService) {}
  getHello(): string {
    const dbName = this.configServer.get<string>('APP_NAME', 'DefaultValue');
    return `Hello World! ${dbName}`;
  }
}
