import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private readonly config: ConfigService) {}

  get jwtKey(): string {
    return this.config.getOrThrow<string>('JWT_KEY');
  }
}
