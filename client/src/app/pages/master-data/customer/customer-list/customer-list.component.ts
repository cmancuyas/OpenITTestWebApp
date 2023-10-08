import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';
import { Customer } from 'src/app/shared/models/customer/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  pageSize: number = 10;
  page: number = 1;

  constructor(private customerService: CustomerService) {}
  ngOnInit(): void {
    this.getAllcustomers();
  }
  getAllcustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (response: any) => {
        this.customers = response.result;
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
  }
}
