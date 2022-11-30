using System.ComponentModel.DataAnnotations;

namespace FobumCinema.Data.Dtos.Cinema
{
        public record CreateCinemaDto([Required] string Name, [Required] string Address);
}
