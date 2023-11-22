import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInputDTO, CreatedUserDto } from './dto/create-user.dto';
import * as trpcExpress from '@trpc/server/adapters/express';
import {
  HttpCode,
  Req,
  UseGuards,
  ForbiddenException,
  INestApplication,
} from '@nestjs/common';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { TRPCService, createTRPCContext } from 'src/trpc/trpc.service';
import { z } from 'zod';
import { loginUserDTO } from './dto/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tRPCService: TRPCService,
  ) {}

  @Post('/register')
  @HttpCode(201)
  async create(
    @Body() createUserDto: CreateUserInputDTO,
    @Res({ passthrough: true }) res: any,
  ) {
    return this.usersService.create(createUserDto, res);
  }

  @Post('/login')
  @HttpCode(201)
  login(
    @Body() createUserDto: loginUserDTO,
    @Res({ passthrough: true }) res: any,
  ) {
    return this.usersService.login(createUserDto, res);
  }

  @Get('/logout')
  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  logout(@GetCurrentUser('sub') userId: number, @Res() res: any) {
    return this.usersService.logout(userId, res);
  }

  @Get('/refresh-token')
  @HttpCode(200)
  @UseGuards(RefreshTokenGuard)
  refreshToken(@GetCurrentUser() user: number, @Res() res: any) {
    return this.usersService.refreshToken(
      user['userId'],
      user['refreshToken'],
      res,
    );
  }

  @Post('/upload-profile')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AccessTokenGuard)
  uploadProfilePhoto(
    @GetCurrentUser() user: number,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return new Error('No file provided');
    }
    return this.usersService.uploadProfileImage(file, user['userId']);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
