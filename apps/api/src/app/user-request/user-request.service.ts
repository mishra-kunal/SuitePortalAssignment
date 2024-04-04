import { Injectable } from '@nestjs/common';
import { UserRequest } from '@suiteportal/api-interfaces';
import { UserRequestDao, UserRequestDB } from './user-request.dao';

@Injectable()
export class UserRequestService {

  constructor(
    private readonly maintReqDao: UserRequestDao,
  ) {
    //
  }

  async createAdminUserRequest(userRequest: UserRequest) {
    return await this.maintReqDao.registerAdmin(userRequest);
  }

  async loginAdminUserRequest(email: string, password : string): Promise<UserRequest> {
    return await this.maintReqDao.loginAdmin(email, password);
  }
}
