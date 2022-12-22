using System;
using System.ComponentModel.DataAnnotations;

namespace FobumCinema.Data.Entities
{
    public class Cinema
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime CreationTimeUtc { get; set; }

    }
}
