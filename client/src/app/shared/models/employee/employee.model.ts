import { Department } from '../department/department.model';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  deptId: number;
  department: Department;
  emailAddress: string;
  phoneNumber: string;
  houseNumber: string;
  street: string;
  brgy: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
}
