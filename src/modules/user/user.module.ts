import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule],
  exports: [],
})
export class UserModule {}
