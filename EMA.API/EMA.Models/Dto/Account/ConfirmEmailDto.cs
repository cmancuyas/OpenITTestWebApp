using System.ComponentModel.DataAnnotations;

namespace EMA.Models.Dto.Account
{
    public class ConfirmEmailDto
    {
        [Required]
        public string Token { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Email Address Invalid")]
        public string Email { get; set; }
    }
}
