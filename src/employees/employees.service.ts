import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { EmployeeModel } from './employees.interface';
import { StatModel } from 'src/stats.interface';
import * as fs from "fs";
import e from 'express';


@Injectable()
export class EmployeesService {    
    private employees: Array<EmployeeModel> = [];

    constructor() {
        try {
            const data = fs.readFileSync('./data/employees.json', 'utf8')
            const jsonData = JSON.parse(data);

            this.employees = jsonData;
        } catch (error) { // 7
            console.log(`ERROR: ${error}`)
        }
    }

    public getSS(onlyContract?:boolean, aggregationLevel?:number): StatModel|Array<StatModel> {        
        var employees = this.employees;

        // if there is contract option, filter data
        if (onlyContract===true) {
            employees = employees.filter(el => el.on_contract);
        }

        if (employees.length>0) {
            // if there is aggregation, perform grouping
            if (aggregationLevel!=null) {
                let stats = new Map<string, StatModel>();
                employees.forEach((employee) => {
                    if (aggregationLevel==1)
                        var key = employee.department;
                    else 
                        var key = employee.department + '-' + employee.sub_department;


                    if (stats.has(key)) {
                        let stat = stats.get(key);
                        stat.min = Math.min(stat.min, Number(employee.salary));
                        stat.max = Math.max(stat.max, Number(employee.salary));
                        stat.total=stat.total+employee.salary;
                        stat.count++;
                        stat.avg=stat.total/stat.count;
                        stats.set(key, stat);
                    } else {
                        let stat:StatModel = {"min": Number(employee.salary), "max": Number(employee.salary), "total": Number(employee.salary), "avg": Number(employee.salary), "count": 1, "department": employee.department, "subdepartment": employee.sub_department};
                        stats.set(key, stat);
                    }
                    
                });

                // iterate over keys and return values
                let sums:Array<StatModel> = [];
                stats.forEach((value) => {
                    const stat:StatModel = {"department": value.department, "min": value.min, "max": value.max, "avg": Math.round(value.avg) }
                    if (aggregationLevel==2) stat.subdepartment=value.subdepartment;
                    sums.push(stat);                
                });
                return sums;
            } else {
                // calculate min, max, avg for employees
                const minVal = Math.min(...employees.map(x=>Number(x.salary)));
                const maxVal = Math.max(...employees.map(x=>Number(x.salary)));
                const avgVal = employees.reduce((a,b) => a+Number(b.salary), 0)/employees.length;
                
                const stat:StatModel = { "min": minVal, "max": maxVal, "avg": Math.round(avgVal)};
                return stat;
            }
        }
        const stat:StatModel = {"min":0, "max":0, "avg":0};
        return stat;
    } 
    
    public create(employee:EmployeeModel):EmployeeModel {
        // if the name is already in use by another employee
        const employeeExists: boolean = this.employees.some(
            (item) => item.name === employee.name,
        );
        if (employeeExists) {
            throw new UnprocessableEntityException('Employee name already exists.');
        }  

        this.employees.push(employee);
        return employee;
    }

    public update(name: String, employee: EmployeeModel): EmployeeModel {
        const index: number = this.employees.findIndex((employee) => employee.name === name);
      
        // -1 is returned when no findIndex() match is found
        if (index === -1) {
          throw new NotFoundException('Employee not found.');
        }
            
        this.employees[index] = employee;
      
        return employee;
      }    
}
