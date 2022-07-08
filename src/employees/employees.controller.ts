import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StatModel } from 'src/stats.interface';
import { EmployeeModel } from './employees.interface';
import { EmployeesService } from './employees.service';
import { ValidEmployeeModel } from './valid-employee-model';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Get('ss')
    public getSS(): StatModel|Array<StatModel> {
      return this.employeesService.getSS();
    }    

    @Get('ssForContract')
    public getSSForContract(): StatModel|Array<StatModel> {
      return this.employeesService.getSS(true);
    }    

    @Get('ssByDepartment')
    public getSSByDepartment(): StatModel|Array<StatModel> {
      return this.employeesService.getSS(false, 1);
    }    

    @Get('ssBySubdepartment')
    public getSSBySubdepartment(): StatModel|Array<StatModel> {
      return this.employeesService.getSS(false, 2);
    }
    
    @Post()
    public create(@Body() employee:ValidEmployeeModel): ValidEmployeeModel {
      return this.employeesService.create(employee);
    }

    @Put(':name')
    public update(@Param('name') name: String, @Body() post: ValidEmployeeModel): ValidEmployeeModel {
      return this.employeesService.update(name, post);
    }    
}
