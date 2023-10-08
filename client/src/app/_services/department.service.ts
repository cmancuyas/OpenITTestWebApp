import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Department } from '../shared/models/department/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl: string = 'api/departments';

  constructor(private http: HttpClient, private router: Router) {}

  getAllDeparments(pageSize?: number, pageNumber?: number) {
    if(pageSize != null && pageNumber != null){
      return this.http.get(
        `${environment.appUrl}/${this.baseUrl}?pageSize=`+pageSize + `&pageNumber=` + pageNumber
      );
    }
    return this.http.get( `${environment.appUrl}/${this.baseUrl}` )
  }

  getDepartment(id: number) {
    return this.http.get(`${environment.appUrl}/${this.baseUrl}/${id}`);
  }

  createDepartment(model: Department) {
    return this.http.post(`${environment.appUrl}/${this.baseUrl}`, model);
  }

  deleteDepartment(model: Department) {
    return this.http.delete(
      `${environment.appUrl}/${this.baseUrl}/${model.id}`
    );
  }
  updateDepartment(model: Department) {
    return this.http.put(
      `${environment.appUrl}/${this.baseUrl}/${model.id}`,
      model
    );
  }
}
