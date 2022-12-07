using System.ComponentModel.DataAnnotations;

namespace FobumCinema.Data.Dtos.Ticket
{
    public record CreateTicketDto([Required] int Id, [Required] int Seat);
}
