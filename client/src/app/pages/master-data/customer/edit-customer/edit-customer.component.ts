import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/_services/customer.service';
import { Customer } from 'src/app/shared/models/customer/customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent {
  editCustomerForm: FormGroup = new FormGroup({});
  customStylesValidated = '';
  submitted = false;
  errorMessages: string[] = [];
  toastrColor: string = '';
  customerId: number | null = null;
  customerEmail: string = '';
  state$!: Observable<object>;
  customer!: Customer;

  editPage: boolean = true;
  colorButton: string = '';
  isDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.initializeForm();

    // debugger;
    let title = this.activatedRoute.snapshot.data['title'];
    if (title == 'Delete Customer') {
      this.editPage = false;
      this.colorButton = 'danger';
    } else {
      this.editPage = true;
      this.colorButton = 'success';
    }

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.customerId = Number(paramMap.get('id'));
      this.customerService.getCustomer(this.customerId).subscribe({
        next: (response: any) => {
          this.customer = response.result;
          this.customerEmail = this.customer.emailAddress;

          debugger;
          this.buildForm();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    });
  }

  initializeForm() {
    this.editCustomerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
    this.editCustomerForm = this.formBuilder.group({
      id: [this.customer.id],
      firstName: [this.customer.firstName],
      lastName: [this.customer.lastName],
      emailAddress: [this.customer.emailAddress],
      phoneNumber: [this.customer.phoneNumber],
      houseNumber: [this.customer.houseNumber],
      street: [this.customer.street],
      brgy: [this.customer.brgy],
      city: [this.customer.city],
      addressLine1: [this.customer.addressLine1],
      addressLine2: [this.customer.addressLine2],
      postalCode: [this.customer.postalCode],
    });

    //false for delete page
    if (this.editPage == false) {
      this.editCustomerForm.get('firstName')?.disable();
      this.editCustomerForm.get('lastName')?.disable();
      this.editCustomerForm.get('emailAddress')?.disable();
      this.editCustomerForm.get('phoneNumber')?.disable();
      this.editCustomerForm.get('houseNumber')?.disable();
      this.editCustomerForm.get('street')?.disable();
      this.editCustomerForm.get('brgy')?.disable();
      this.editCustomerForm.get('city')?.disable();
      this.editCustomerForm.get('addressLine1')?.disable();
      this.editCustomerForm.get('addressLine2')?.disable();
      this.editCustomerForm.get('postalCode')?.disable();
    }
  }

  onReset() {}
  onSubmit(): void {
    this.submitted = true;
    // debugger;
    if (this.editCustomerForm.valid) {
      // Edit
      if (this.editPage == true) {
        this.customerService
          .updateCustomer(this.editCustomerForm.value)
          .subscribe({
            next: (response: any) => {
              this.toastrColor = 'success';
              this.errorMessages.push('Successfully edited the customer');
              this.router.navigateByUrl('/master-data/customeres');
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
        this.customerService
          .deleteCustomer(this.editCustomerForm.value)
          .subscribe({
            next: (response: any) => {
              this.toastrColor = 'success';
              this.errorMessages.push('Successfully deleted the customer');
              this.router.navigateByUrl('/master-data/customer');
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
