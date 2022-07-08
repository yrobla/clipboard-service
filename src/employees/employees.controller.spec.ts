import { StatModel } from 'src/stats.interface';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

describe('EmployeesController', () => {
  let employeesController: EmployeesController;
  let employeesService: EmployeesService;

  beforeEach(() => {
    employeesService = new EmployeesService();
    employeesController = new EmployeesController(employeesService);
  });

  describe('getSS', () => {
    it('should return stats', async () => {
      const result:StatModel = {"min": 0, "max": 0, "avg": 0};
      jest.spyOn(employeesService, 'getSS').mockImplementation(() => result);

      expect(await employeesController.getSS()).toBe(result);
    });
  });
});