import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Employee } from '../shared/models/employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl: string = 'api/employees';

  constructor(private http: HttpClient, private router: Router) {}

  getAllEmployees(pageSize?: number, pageNumber?: number) {
    if(pageSize != null && pageNumber != null){
      return this.http.get(
        `${environment.appUrl}/${this.baseUrl}?pageSize=`+pageSize + `&pageNumber=` + pageNumber
      );
    }
    return this.http.get( `${environment.appUrl}/${this.baseUrl}` )
  }

  getEmployee(id: number) {
    return this.http.get(`${environment.appUrl}/${this.baseUrl}/${id}`);
  }

  createEmployee(model: Employee) {
    return this.http.post(`${environment.appUrl}/${this.baseUrl}`, model);
  }

  deleteEmployee(model: Employee) {
    return this.http.delete(
      `${environment.appUrl}/${this.baseUrl}/${model.id}`
    );
  }
  updateEmployee(model: Employee) {
    return this.http.put(
      `${environment.appUrl}/${this.baseUrl}/${model.id}`,
      model
    );
  }
}
