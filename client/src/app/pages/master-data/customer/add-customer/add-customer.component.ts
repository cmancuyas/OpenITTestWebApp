import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  addCustomerForm!: FormGroup;

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
    private customerService: CustomerService,
    private router: Router
  ) {
    this.createForm();
  }
  ngOnInit(): void {}

  createForm() {
    this.addCustomerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
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
    this.formControls = Object.keys(this.addCustomerForm.controls);
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    console.log(this.addCustomerForm);
    return this.addCustomerForm.status === 'VALID';
  }

  onSubmit() {
    this.messages = [];
    console.warn(this.onValidate(), this.addCustomerForm.value);
    if (this.onValidate()) {
      // TODO: Submit form value
      console.warn(this.addCustomerForm.value);

      this.customerService
        .createCustomer(this.addCustomerForm.value)
        .subscribe({
          next: (response: any) => {
            if (response.isSuccess == true || response.statusCode == 201) {
              // alert('SUCCESS!');
              this.router.navigateByUrl('/master-data/customer').then(() => {
                // debugger;
                this.toastrColor = 'success';
                this.messages.push('Successfully added the Customer');
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
