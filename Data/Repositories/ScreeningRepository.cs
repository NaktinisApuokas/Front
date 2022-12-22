using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FobumCinema.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FobumCinema.Data.Repositories
{
    public interface IScreeningRepository
    {
        Task<Screening> GetAsync(int movieId, int screeningId);
        Task<List<Screening>> GetAsync(int movieId);
        Task InsertAsync(Screening screening);
        Task UpdateAsync(Screening screening);
        Task DeleteAsync(Screening screening);
    }

    public class ScreeningRepository : IScreeningRepository
    {
        private readonly FobumCinemaContext _FobumCinemaContext;

        public ScreeningRepository(FobumCinemaContext fobumCinemaContext)
        {
            _FobumCinemaContext = fobumCinemaContext;
        }

        public async Task<Screening> GetAsync(int movieId, int screeningId)
        {
            return await _FobumCinemaContext.Screening.FirstOrDefaultAsync(o => o.MovieId == movieId && o.Id == screeningId);
        }

        public async Task<List<Screening>> GetAsync(int movieId)
        {
            return await _FobumCinemaContext.Screening.Where(o => o.MovieId == movieId).ToListAsync();
        }

        public async Task InsertAsync(Screening screening)
        {
            _FobumCinemaContext.Screening.Add(screening);
            await _FobumCinemaContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Screening screening)
        {
            _FobumCinemaContext.Screening.Update(screening);
            await _FobumCinemaContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Screening screening)
        {
            _FobumCinemaContext.Screening.Remove(screening);
            await _FobumCinemaContext.SaveChangesAsync();
        }
    }
}
