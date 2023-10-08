using EMA.DataAccess.Repository.IRepository;
using EMA.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMA.DataAccess.Repository
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        private readonly ApplicationDbContext _db;

        public DepartmentRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public async Task<Department> UpdateAsync(Department entity)
        {
            _db.Departments.Update(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
    }
}
