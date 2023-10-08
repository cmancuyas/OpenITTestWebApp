import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DepartmentService } from 'src/app/_services/department.service';
import { Department } from 'src/app/shared/models/department/department.model';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
})
export class EditDepartmentComponent implements OnInit {
  editDepartmentForm: FormGroup = new FormGroup({});
  customStylesValidated = '';
  submitted = false;
  errorMessages: string[] = [];
  toastrColor: string = '';
  departmentId: number | null = null;
  departmentName: string = '';
  state$!: Observable<object>;
  department!: Department;
  editPage: boolean = true;
  colorButton: string = '';
  isDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.initializeForm();

    // debugger;
    let title = this.activatedRoute.snapshot.data['title'];
    if (title == 'Delete Department') {
      this.editPage = false;
      this.colorButton = 'danger';
    } else {
      this.editPage = true;
      this.colorButton = 'success';
    }

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.departmentId = Number(paramMap.get('id'));
      this.departmentService.getDepartment(this.departmentId).subscribe({
        next: (response: any) => {
          this.department = response.result;
          this.departmentName = this.department.name;
          this.buildForm();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    });
  }

  initializeForm() {
    this.editDepartmentForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  buildForm() {
    this.editDepartmentForm = this.formBuilder.group({
      id: [this.department.id],
      name: [this.department.name],
    });

    //false for delete page
    if (this.editPage == false) {
      this.editDepartmentForm.get('name')?.disable();
    }
  }

  onReset() {}
  onSubmit(): void {
    this.submitted = true;
    // debugger;
    if (this.editDepartmentForm.valid) {
      // Edit
      if (this.editPage == true) {
        this.departmentService.updateDepartment(this.editDepartmentForm.value).subscribe({
          next: (response: any) => {
            this.toastrColor = 'success';
            this.errorMessages.push('Successfully edited the department');
            this.router.navigateByUrl('/master-data/department');
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
        this.departmentService.deleteDepartment(this.editDepartmentForm.value).subscribe({
          next: (response: any) => {
            this.toastrColor = 'success';
            this.errorMessages.push('Successfully deleted the department');
            this.router.navigateByUrl('/master-data/department');
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
