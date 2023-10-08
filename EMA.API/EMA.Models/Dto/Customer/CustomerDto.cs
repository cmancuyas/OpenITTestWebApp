using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMA.Models.Dto.Customer
{
    public class CustomerDto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(30)]
        public string FirstName { get; set; }
        [StringLength(30)]
        [Required]
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string HouseNumber { get; set; }
        public string Street { get; set; }

        [MaxLength(50)]
        public string Brgy { get; set; }

        [MaxLength (50)]
        public string City { get; set; }
        [Required, MaxLength(255)]
        public string AddressLine1 { get; set; }
        [Required, MaxLength(255)]
        public string AddressLine2 { get; set; }
        public string PostalCode { get; set; }
    }
}
