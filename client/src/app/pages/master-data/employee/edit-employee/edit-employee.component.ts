import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DepartmentService } from 'src/app/_services/department.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Department } from 'src/app/shared/models/department/department.model';
import { Employee } from 'src/app/shared/models/employee/employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent {
  editEmployeeForm: FormGroup = new FormGroup({});
  customStylesValidated = '';
  submitted = false;
  errorMessages: string[] = [];
  toastrColor: string = '';
  employeeId: number | null = null;
  employeeEmail: string = '';
  state$!: Observable<object>;
  employee!: Employee;
  departments: Department[] = [];
  employeeDepartment!: Department;
  editPage: boolean = true;
  colorButton: string = '';
  isDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.initializeForm();

    // debugger;
    let title = this.activatedRoute.snapshot.data['title'];
    if (title == 'Delete Employee') {
      this.editPage = false;
      this.colorButton = 'danger';
    } else {
      this.editPage = true;
      this.colorButton = 'success';
    }

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.employeeId = Number(paramMap.get('id'));
      this.employeeService.getEmployee(this.employeeId).subscribe({
        next: (response: any) => {
          this.employee = response.result;
          this.employeeEmail = this.employee.emailAddress;

          debugger;
          this.buildForm();

          this.getAllDepartments();
          this.getDepartment(this.employee.deptId);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    });
  }

  getAllDepartments() {
    this.departmentService.getAllDeparments().subscribe({
      next: (response: any) => {
        this.departments = response.result;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getDepartment(id: number) {
    this.departmentService.getDepartment(id).subscribe({
      next: (response: any) => {
        this.employeeDepartment = response.result;
        debugger;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  initializeForm() {
    this.editEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      deptId: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNumber: [''],
      houseNumber: [''],
      street: [''],
      brgy: [''],
      city: [''],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      postalCode: [''],
    });
  }

  buildForm() {
    this.editEmployeeForm = this.formBuilder.group({
      id: [this.employee.id],
      firstName: [this.employee.firstName],
      lastName: [this.employee.lastName],
      deptId: [this.employee.deptId],
      emailAddress: [this.employee.emailAddress],
      phoneNumber: [this.employee.phoneNumber],
      houseNumber: [this.employee.houseNumber],
      street: [this.employee.street],
      brgy: [this.employee.brgy],
      city: [this.employee.city],
      addressLine1: [this.employee.addressLine1],
      addressLine2: [this.employee.addressLine2],
      postalCode: [this.employee.postalCode],
    });

    //false for delete page
    if (this.editPage == false) {
      this.editEmployeeForm.get('firstName')?.disable();
      this.editEmployeeForm.get('lastName')?.disable();
      this.editEmployeeForm.get('deptId')?.disable();
      this.editEmployeeForm.get('emailAddress')?.disable();
      this.editEmployeeForm.get('phoneNumber')?.disable();
      this.editEmployeeForm.get('houseNumber')?.disable();
      this.editEmployeeForm.get('street')?.disable();
      this.editEmployeeForm.get('brgy')?.disable();
      this.editEmployeeForm.get('city')?.disable();
      this.editEmployeeForm.get('addressLine1')?.disable();
      this.editEmployeeForm.get('addressLine2')?.disable();
      this.editEmployeeForm.get('postalCode')?.disable();
    }
  }

  onReset() {}
  onSubmit(): void {
    this.submitted = true;
    // debugger;
    if (this.editEmployeeForm.valid) {
      // Edit
      if (this.editPage == true) {
        this.employeeService
          .updateEmployee(this.editEmployeeForm.value)
          .subscribe({
            next: (response: any) => {
              this.toastrColor = 'success';
              this.errorMessages.push('Successfully edited the employee');
              this.router.navigateByUrl('/master-data/employeees');
            },
            error: (error: any) => {
              this.toastrColor = 'danger';
              if (error.error.errors) {
                this.errorMessages = error.error.errors;
              } else {
                this.errorMessages.push(error.error);
              }
            },
          });
      } else {
        // Delete
        this.employeeService
          .deleteEmployee(this.editEmployeeForm.value)
          .subscribe({
            next: (response: any) => {
              this.toastrColor = 'success';
              this.errorMessages.push('Successfully deleted the employee');
              this.router.navigateByUrl('/master-data/employee');
            },
            error: (error: any) => {
              this.toastrColor = 'danger';
              if (error.error.errors) {
                this.errorMessages = error.error.errors;
              } else {
                this.errorMessages.push(error.error);
              }
            },
          });
      }
    }
  }
}
