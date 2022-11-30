using System.ComponentModel.DataAnnotations;

namespace FobumCinema.Data.Dtos.Screening
{
    public record CreateScreeningDto( [Required] int Hall, [Required] float Price, [Required] int Seatnumber);

}
