import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { ContentModule } from './content/content.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { mongoConstants } from '../contstants/mongo';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      `mongodb+srv://${mongoConstants.username}:${mongoConstants.password}@qri-back-end.rv47puc.mongodb.net/?retryWrites=true&w=majority`,
    ),
    ClientsModule,
    ContentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
