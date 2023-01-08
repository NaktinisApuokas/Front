using FobumCinema.Data.Dtos.Auth;
using FobumCinema.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace FobumCinema.Infrastructure
{
    public class FobumCinemaContext : IdentityDbContext<FobumCinemaUser>
    {
        public DbSet<Cinema> Cinema { get; set; }
        public DbSet<Movie> Movie { get; set; }
        public DbSet<Screening> Screening { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=presentcon");
        }
    }
}