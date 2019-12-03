import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Retrun hello
  getHello(): string {
    return 'Hello World!';
  }
}
