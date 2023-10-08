using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMA.Models.Entities
{
    public class User : IdentityUser
    {
        [Required]
        public required string FirstName { get; set; }
        [Required]
        public required string LastName { get; set; }
        public string Role { get; set; } = string.Empty;
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
