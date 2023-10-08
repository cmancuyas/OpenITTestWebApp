using EMA.DataAccess.Repository.IRepository;
using EMA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMA.DataAccess.Repository
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        private readonly ApplicationDbContext _db;

        public CustomerRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public async Task<Customer> UpdateAsync(Customer entity)
        {
            _db.Customers.Update(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
    }
}
