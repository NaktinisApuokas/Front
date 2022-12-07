using System.ComponentModel.DataAnnotations;

namespace FobumCinema.Data.Dtos.Ticket
{
    public record UpdateTicketDto([Required] int Seat);
}
