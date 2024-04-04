/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { UserRequestController } from './user-request.controller';
import { UserRequestService } from './user-request.service';

describe('UserRequestController', () => {
  let controller: UserRequestController;

  let mockService: UserRequestService;

  beforeEach(async () => {
    mockService = {} as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRequestController],
      providers: [{ provide: UserRequestService, useValue: mockService }],
    }).compile();

    controller = module.get<UserRequestController>(UserRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call dao when login a user request', async () => {
    mockService.loginAdminUserRequest = jest
      .fn()
      .mockResolvedValue({
        id: '1',
        email: 'test@gmail.com',
        password: 'test',
      });

    const result = await controller.loginAdminUserRequest({
      email: 'test@gmail.com',
      password: 'test',
    });

    expect(mockService.loginAdminUserRequest).toHaveBeenCalled();
    // if got token and user, then it is successful;
    expect(result).toEqual({
      id: '1',
      email: 'test@gmail.com',
      password: 'test',
    });
  });
});
