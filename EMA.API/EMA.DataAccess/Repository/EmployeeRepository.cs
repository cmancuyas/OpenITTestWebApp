using EMA.DataAccess.Repository.IRepository;
using EMA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMA.DataAccess.Repository
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        private readonly ApplicationDbContext _db;

        public EmployeeRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public async Task<Employee> UpdateAsync(Employee entity)
        {
            _db.Employees.Update(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
    }
}
