import { Global, Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { ApiConfigService } from './api-config.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Global()
@Module({
  providers: [CoreService, ApiConfigService, TokenService],
  imports: [
    JwtModule.registerAsync({
      useFactory: async (apiConfigService: ApiConfigService) => ({
        secret: apiConfigService.jwtKey,
      }),
      inject: [ApiConfigService],
    }),
  ],
  exports: [ApiConfigService, TokenService],
})
export class CoreModule {}
