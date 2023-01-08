using Microsoft.AspNetCore.Identity;

namespace FobumCinema.Data.Dtos.Auth
{
    public class FobumCinemaUser : IdentityUser
    {
        [PersonalData]
        public string? AdditionalInfo { get; set; }
    }
}
