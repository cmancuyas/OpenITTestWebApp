import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';

import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentDetailsComponent } from './department/department-details/department-details.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    DepartmentListComponent,
    DepartmentDetailsComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    CustomerDetailsComponent,
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    SharedModule
  ]
})
export class MasterDataModule { }
