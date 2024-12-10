import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenService } from './token/token.service';
import { ConfigModule } from '@nestjs/config';
import { TokenController } from './token/token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from './booking/booking.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Automatically load entities
      synchronize: true,
      logging: true, // Automatically sync schema (turn off in production)
    }),
    BookingModule,
  ],
  controllers: [AppController, TokenController],
  providers: [AppService, TokenService],
})

export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('Database connection successful......!!!!');
  }
}
