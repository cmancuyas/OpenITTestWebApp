using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMA.Models.Entities
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(30)]
        public string FirstName { get; set; } = string.Empty;
        [StringLength(30)]
        [Required]
        public string LastName { get; set; } = string.Empty;
        public required int DeptId { get; set; }
        [ForeignKey("DeptId")]
        public required Department Department { get; set; }
        public string EmailAddress { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string HouseNumber { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string Brgy { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        [Required, MaxLength(255)]
        public string AddressLine1 { get; set; } = string.Empty;
        [Required, MaxLength(255)]
        public string AddressLine2 { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
    }
}
