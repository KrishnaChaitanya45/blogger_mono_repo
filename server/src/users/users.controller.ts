import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpCode, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { TRPCService } from 'src/trpc/trpc.service';
import { z } from 'zod';
@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tRPCService: TRPCService,
  ) {}

  // authRouter = this.tRPCService.router({
  //   create:this.tRPCService.procedure.input(z.object({name:z.string(), email:z.string(), password:z.string()})).mutation(({input, ctx})=>{

  //     return this.usersService.create(input)
  //   }),
  // });
  @Post('/register')
  @HttpCode(201)
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: any,
  ) {
    return this.usersService.create(createUserDto, res);
  }

  @Post('/login')
  @HttpCode(201)
  login(
    @Body() createUserDto: CreateUserDto,
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

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
