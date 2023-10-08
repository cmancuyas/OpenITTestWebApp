using AutoMapper;
using EMA.Models;
using EMA.Models.Dto.Customer;
using EMA.Models.Dto.Department;
using EMA.Models.Entities;

namespace EMA.API.Mapper
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {

            // Customer
            CreateMap<Customer, CustomerDto>();
            CreateMap<CustomerDto, Customer>();

            CreateMap<Customer, CustomerCreateDto>().ReverseMap();
            CreateMap<Customer, CustomerUpdateDto>().ReverseMap();

            //Employee
            CreateMap<Employee, EmployeeDto>();
            CreateMap<EmployeeDto, Employee>();

            CreateMap<Employee, EmployeeCreateDto>().ReverseMap();
            CreateMap<Employee, EmployeeUpdateDto>().ReverseMap();

            //Department
            CreateMap<Department, DepartmentDto>();
            CreateMap<DepartmentDto, Department>();

            CreateMap<Department, DepartmentCreateDto>().ReverseMap();
            CreateMap<Department, DepartmentUpdateDto>().ReverseMap();
        }
    }
}
