import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';

@Module({
  imports: [UserModule],
})
export class ApiModule {}
