using System.ComponentModel.DataAnnotations;

namespace FobumCinema.Data.Dtos.Auth
{
    public record RegisterDto([Required] string UserName, [EmailAddress][Required] string Email, [Required] string Password);
}
