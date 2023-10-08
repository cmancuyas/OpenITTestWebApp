import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/_services/department.service';
import { SharedService } from 'src/app/shared/components/modals/shared.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit {
  addDepartmentForm!: FormGroup;
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
    private departmentService: DepartmentService,
    private router: Router
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createForm() {
    this.addDepartmentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
    this.formControls = Object.keys(this.addDepartmentForm.controls);
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.addDepartmentForm.status === 'VALID';
    console.log(this.addDepartmentForm);
  }

  onSubmit() {
    this.messages = [];
    console.warn(this.onValidate(), this.addDepartmentForm.value);
    if (this.onValidate()) {
      // TODO: Submit form value
      console.warn(this.addDepartmentForm.value);

      this.departmentService.createDepartment(this.addDepartmentForm.value).subscribe({
        next: (response: any) => {
          if (response.isSuccess == true || response.statusCode == 201) {
            // alert('SUCCESS!');
            this.router.navigateByUrl('/master-data/department').then(() => {
              // debugger;
              this.toastrColor = 'success';
              this.messages.push('Successfully added the Department');
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
