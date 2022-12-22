using Academy.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Academy.Data
{
    public class AcademyContext : DbContext
    {
        public DbSet<Item> Item { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // !!! DON'T STORE THE REAL CONNECTION STRING THE IN PUBLIC REPO !!!
            // Use secret managers provided by your chosen cloud provider
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=FullStack");
        }
    }
}
