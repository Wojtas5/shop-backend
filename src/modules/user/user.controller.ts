import {
  Body,
  Controller,
  Post,
  Headers,
  HttpException,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { decodeAuthHeader } from './user.helpers';
import { Response } from 'express';
import { UserGuard } from './user.guard';
import { UserID } from './userid.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async createUser(@Body() body: RegisterUserDto) {
    const user = await this.userService.registerUser(body);
    return this.userService.createToken(user);
  }

  @Post('/login')
  @HttpCode(200)
  async loginUser(
    @Headers('authorization') header: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!header)
      throw new HttpException(
        'No authorization header',
        HttpStatus.BAD_REQUEST,
      );

    const authData = decodeAuthHeader(header);
    if (!authData)
      throw new HttpException(
        'Wrong authorization header',
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.userService.verifyUser(authData);
    const token = this.userService.createToken(user);
    response.cookie('access-token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });
    response.cookie('auth', true, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
  }

  @Get()
  @UseGuards(UserGuard)
  getTest(@UserID() userid: number) {
    return `Hello userid: ${userid}`;
  }
}
