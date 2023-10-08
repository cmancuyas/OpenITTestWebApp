import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { DepartmentDetailsComponent } from './department/department-details/department-details.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';

const routes: Routes = [
  {path:"",
    children:[
      // Employee
      {
        path:'employee',
        component: EmployeeListComponent,
        data: {
          title: 'Employee List',
        },
      },
      {
        path:'employee/details/:id',
        component: EmployeeDetailsComponent,
        data: {
          title: 'Employee Details',
        },
      },
      {
        path:'employee/add',
        component: AddEmployeeComponent,
        data: {
          title: 'Add Employee',
        },
      },
      {
        path:'employee/edit/:id',
        component: EditEmployeeComponent,
        data: {
          title: 'Edit Employee',
        },
      },
      {
        path:'employee/delete/:id',
        component: EditEmployeeComponent,
        data: {
          title: 'Delete Employee',
        },
      },
      // Department
      {
        path:'department',
        component: DepartmentListComponent,
        data: {
          title: 'Department List',
        },
      },
      {
        path:'department/details/:id',
        component: DepartmentDetailsComponent,
        data: {
          title: 'Department Details',
        },
      },
      {
        path:'department/add',
        component: AddDepartmentComponent,
        data: {
          title: 'Add Department',
        },
      },
      {
        path:'department/edit/:id',
        component: EditDepartmentComponent,
        data: {
          title: 'Edit Department',
        },
      },
      {
        path:'department/delete/:id',
        component: EditDepartmentComponent,
        data: {
          title: 'Delete Department',
        },
      },

      // Customer
      {
        path:'customer',
        component: CustomerListComponent,
        data: {
          title: 'Customer List',
        },
      },
      {
        path:'customer/details/:id',
        component: CustomerDetailsComponent,
        data: {
          title: 'Customer Details',
        },
      },
      {
        path:'customer/add',
        component: AddCustomerComponent,
        data: {
          title: 'Add Customer',
        },
      },
      {
        path:'customer/edit/:id',
        component: EditCustomerComponent,
        data: {
          title: 'Edit Customer',
        },
      },
      {
        path:'customer/delete/:id',
        component: EditCustomerComponent,
        data: {
          title: 'Delete Customer',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
