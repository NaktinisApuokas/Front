using System.Collections.Generic;
using System.Threading.Tasks;
using FobumCinema.Data.Entities;
using FobumCinema.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace FobumCinema.Data.Repositories
{
    public interface ICinemaRepository
    {
        Task<IEnumerable<Cinema>> GetAll();
        Task<Cinema> Get(int id);
        Task<Cinema> Create(Cinema cinema);
        Task<Cinema> Put(Cinema cinema);
        Task Delete(Cinema cinema);
    }

    public class CinemaRepository : ICinemaRepository
    {
        private readonly FobumCinemaContext _FobumCinemaContext;

        public CinemaRepository(FobumCinemaContext fobumCinemaContext)
        {
            _FobumCinemaContext = fobumCinemaContext;
        }

        public async Task<IEnumerable<Cinema>> GetAll()
        {
            return await _FobumCinemaContext.Cinema.ToListAsync();
        }

        public async Task<Cinema> Get(int id)
        {
            return await _FobumCinemaContext.Cinema.FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<Cinema> Create(Cinema cinema)
        {
            _FobumCinemaContext.Cinema.Add(cinema);
            await _FobumCinemaContext.SaveChangesAsync();

            return cinema;
        }

        public async Task<Cinema> Put(Cinema cinema)
        {
            _FobumCinemaContext.Cinema.Update(cinema);
            await _FobumCinemaContext.SaveChangesAsync();

            return cinema;
        }

        public async Task Delete(Cinema cinema)
        {
            _FobumCinemaContext.Cinema.Remove(cinema);
            await _FobumCinemaContext.SaveChangesAsync();
        }
    }
}
