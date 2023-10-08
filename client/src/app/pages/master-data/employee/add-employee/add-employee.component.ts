import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/_services/department.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Department } from 'src/app/shared/models/department/department.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  addEmployeeForm!: FormGroup;
  departments: Department[] = [];
  submitted = false;
  formErrors: any;
  formControls!: string[];
  messages: string[] = [];

  // toastr
  toastrColor: string = '';
  position = 'top-end';
  visible = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService.getAllDeparments().subscribe({
      next: (response: any) => {
        this.departments = response.result;
        // debugger;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  createForm() {
    this.addEmployeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      deptId: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      phoneNumber: [''],
      houseNumber: [''],
      street: [''],
      brgy: [''],
      city: [''],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      postalCode: [''],
    });
    this.formControls = Object.keys(this.addEmployeeForm.controls);
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    console.log(this.addEmployeeForm);
    return this.addEmployeeForm.status === 'VALID';
  }

  onSubmit() {
    this.messages = [];
    console.warn(this.onValidate(), this.addEmployeeForm.value);
    if (this.onValidate()) {
      // TODO: Submit form value
      console.warn(this.addEmployeeForm.value);

      this.employeeService
        .createEmployee(this.addEmployeeForm.value)
        .subscribe({
          next: (response: any) => {
            if (response.isSuccess == true || response.statusCode == 201) {
              // alert('SUCCESS!');
              this.router.navigateByUrl('/master-data/employee').then(() => {
                // debugger;
                this.toastrColor = 'success';
                this.messages.push('Successfully added the Employee');
                this.visible = true;
              });
            }
          },
          error: (error: any) => {
            this.toastrColor = 'danger';
            this.visible = true;
            if (error.error.CustomError) {
              this.messages.push(error.error.CustomError);
            } else {
              if (error.error.errors) {
                this.messages = error.error.errors;
              } else {
                this.messages.push(error.error);
              }
            }
          },
        });
    }
  }
}
