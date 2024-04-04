/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MaintenanceRequestService } from './maintenance-request.service';

describe('MaintenanceRequestController', () => {
  let controller: MaintenanceRequestController;

  let mockService: MaintenanceRequestService;

  beforeEach(async () => {
    mockService = {} as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceRequestController],
      providers: [
        { provide: MaintenanceRequestService, useValue: mockService },
      ]
    }).compile();

    controller = module.get<MaintenanceRequestController>(MaintenanceRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call dao when getting a maintenance request by id', async () => {
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue({ id: '1', summary: 'test' });

    const result = await controller.getMaintenanceRequest('1');

    expect(mockService.getMaintenanceRequest).toHaveBeenCalled();
    expect(result).toEqual({ id: '1', summary: 'test'});
  });

  it('should call dao when closing a maintenance request', async () => {
    mockService.closeMaintenanceRequest = jest.fn().mockResolvedValue({ id: '1', summary: 'test' });

    const result = await controller.closeMaintenanceRequest('1');

    expect(mockService.closeMaintenanceRequest).toHaveBeenCalled();
    expect(result).toEqual({ id: '1', summary: 'test'});
  });


  it('should call dao when listing all maintenance requests', async () => {
    mockService.listAllRequests = jest.fn().mockResolvedValue([{ id: '1', summary: 'test' }, { id: '2', summary: 'test22' }]);

    const result = await controller.listAllRequests();

    expect(mockService.listAllRequests).toHaveBeenCalled();
    expect(result).toEqual([{ id: '1', summary: 'test' }, { id: '2', summary: 'test22' }]);
  });


});
