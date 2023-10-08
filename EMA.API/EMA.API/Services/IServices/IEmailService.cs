using EMA.Models.Dto.Account;

namespace EMA.API.Services.IServices
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(EmailSendDto emailSend);
    }
}
