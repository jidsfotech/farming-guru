import { Module } from '@nestjs/common';
import { BlogModule } from './modules/blog/blog.module';
import { FarmModule } from './modules/farming-assist/farming.module';
import { ConfigModule } from '@nestjs/config';
// import configuration from 'config/configuration';

@Module({
  imports: [
    BlogModule,
    FarmModule,
    ConfigModule.forRoot({
      // load: [configuration],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
