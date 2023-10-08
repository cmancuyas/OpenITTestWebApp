using EMA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMA.DataAccess.Repository.IRepository
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        Task<Customer> UpdateAsync(Customer customer);
    }
}
