import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorHandler } from '../shared/Https/http-error.handler';
import { LoggingInterceptor } from '../shared/Interceptor/logging.interceptor';
import { TimeoutInterceptor } from '../shared/Interceptor/timeout.interceptor';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorHandler,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
