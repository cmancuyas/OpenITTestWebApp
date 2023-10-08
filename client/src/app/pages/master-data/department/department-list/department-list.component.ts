import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DepartmentService } from 'src/app/_services/department.service';
import { Department } from 'src/app/shared/models/department/department.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  pageSize: number = 10;
  page: number = 1;

  constructor(private departmentService: DepartmentService) {}
  ngOnInit(): void {
    this.getAllDepartments();
  }
  getAllDepartments() {
    this.departmentService.getAllDeparments().subscribe({
      next: (response: any) => {
        this.departments = response.result;
      },
      error: (err: any) => {
        console.warn(err);
      },
    });

  }
}
