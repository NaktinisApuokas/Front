using System.ComponentModel.DataAnnotations;

namespace FobumCinema.Data.Dtos.Movie
{
        public record CreateMovieDto([Required] string Title, [Required] string Genre, [Required] string Description);
    
}
