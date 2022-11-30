using System;

namespace FobumCinema.Data.Entities
{
    public class Screening
    {
        public int Id { get; set; }
        public int Hall { get; set; }
        public DateTime Time { get; set; }
        public int Seatnumber { get; set; }
        public float Price { get; set; }

        public DateTime CreationTimeUtc { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
    }
}
