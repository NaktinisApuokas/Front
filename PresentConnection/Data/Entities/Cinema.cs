using FobumCinema.Auth.Model;
using System;
using System.ComponentModel.DataAnnotations;
using FobumCinema.Data.Dtos.Auth;

namespace FobumCinema.Data.Entities
{
    public class Cinema : IUserOwnedresource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime CreationTimeUtc { get; set; }

        [Required]
        public string UserId { get; set; }
        public FobumCinemaUser User { get; set; }
    }
}
