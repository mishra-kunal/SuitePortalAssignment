import { BadRequestException, Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { UserRequest } from '@suiteportal/api-interfaces';
import { UserRequestService } from './user-request.service';

@Controller('user-requests')
export class UserRequestController {

  constructor(
    private readonly userRequestService: UserRequestService,
  ) {
    //
  }


  @Post('/register-admin')
  public async createAdminUserRequest(
    @Body() userRequest: UserRequest,
  ) {
    if (!userRequest?.email) {
      throw new BadRequestException('Must provide a valid email');
    }
    if (!userRequest?.password) {
      throw new BadRequestException('Must provide a valid password');
    }
    return await this.userRequestService.createAdminUserRequest(userRequest);
  }

  @Post('/login-admin')
  public async loginAdminUserRequest(
    @Body() userRequest: UserRequest,
  ) {
    if (!userRequest?.email) {
      throw new BadRequestException('Must provide a valid email');
    }
    if (!userRequest?.password) {
      throw new BadRequestException('Must provide a valid password');
    }
    return await this.userRequestService.loginAdminUserRequest(userRequest.email, userRequest.password);
  }


}
