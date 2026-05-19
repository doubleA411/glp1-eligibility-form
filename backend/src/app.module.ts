import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './session/session.module';
import { FormModule } from './form/form.module';

@Module({
  imports: [SessionModule, FormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
