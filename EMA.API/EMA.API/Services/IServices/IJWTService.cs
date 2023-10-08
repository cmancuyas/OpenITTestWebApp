using EMA.Models.Entities;

namespace EMA.API.Services.IServices
{
    public interface IJWTService
    {
        string CreateJWT(User user);
    }
}
