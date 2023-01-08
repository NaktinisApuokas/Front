using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FobumCinema.Data.Entities;
using FobumCinema.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace FobumCinema.Data.Repositories
{
    public interface IMovieRepository
    {
        Task<Movie> GetAsync(int cinemaId, int movieId);
        Task<List<Movie>> GetAsync(int cinemaId);
        Task InsertAsync(Movie movie);
        Task UpdateAsync(Movie movie);
        Task DeleteAsync(Movie movie);
    }

    public class MovieRepository : IMovieRepository
    {
        private readonly FobumCinemaContext _FobumCinemaContext;

        public MovieRepository(FobumCinemaContext fobumCinemaContext)
        {
            _FobumCinemaContext = fobumCinemaContext;
        }

        public async Task<Movie> GetAsync(int cinemaId, int movieId)
        {
            return await _FobumCinemaContext.Movie.FirstOrDefaultAsync(o => o.CinemaId == cinemaId && o.Id == movieId);
        }

        public async Task<List<Movie>> GetAsync(int cinemaId)
        {
            return await _FobumCinemaContext.Movie.Where(o => o.CinemaId == cinemaId).ToListAsync();
        }

        public async Task InsertAsync(Movie movie)
        {
            _FobumCinemaContext.Movie.Add(movie);
            await _FobumCinemaContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Movie movie)
        {
            _FobumCinemaContext.Movie.Update(movie);
            await _FobumCinemaContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Movie movie)
        {
            _FobumCinemaContext.Movie.Remove(movie);
            await _FobumCinemaContext.SaveChangesAsync();
        }
    }
}
