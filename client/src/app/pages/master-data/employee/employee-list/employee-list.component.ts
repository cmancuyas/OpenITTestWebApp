import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Employee } from 'src/app/shared/models/employee/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  pageSize: number = 10;
  page: number = 1;

  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (response: any) => {
        this.employees = response.result;
      },
      error: (err: any) => {
        console.warn(err);
      },
    });

  }
}
