using System;

namespace FobumCinema.Data.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public int Seat { get; set; }
        public DateTime CreationTimeUtc { get; set; }
        public int ScreeningId { get; set; }
        public Screening Screening { get; set; }
    }
}
