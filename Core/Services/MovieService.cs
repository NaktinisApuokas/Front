using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using FobumCinema.Data.Dtos.Cinema;
using FobumCinema.Data.Dtos.Movie;
using FobumCinema.Data.Entities;
using FobumCinema.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FobumCinema.Data.Repositories
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieDto>> GetAll(int cinemaId);
        Task<MovieDto> Get(int cinemaId, int movieId);
        Task<MovieDto> Create(int cinemaId, CreateMovieDto movieDto);
        Task<MovieDto> Put(int CinemaId, int movieId, UpdateMovieDto movieDto);
        Task<MovieDto> Delete(int CinemaId, int movieId);
    }

    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _MovieRepository;
        private readonly IMapper _mapper;

        public MovieService(IMovieRepository MovieRepository, IMapper mapper)
        {
            _MovieRepository = MovieRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<MovieDto>> GetAll(int cinemaId)
        {
            var movies = await _MovieRepository.GetAsync(cinemaId);
            return movies.Select(o => _mapper.Map<MovieDto>(o));
        }

        public async Task<MovieDto> Get(int cinemaId, int movieId)
        {
            var movie = await _MovieRepository.GetAsync(cinemaId, movieId);
            var dto = (_mapper.Map<MovieDto>(movie));

            return dto;
        }

        public async Task<MovieDto> Create(int cinemaId, CreateMovieDto movieDto)
        {
            var movie = _mapper.Map<Movie>(movieDto);

            movie.CinemaId = cinemaId;

            await _MovieRepository.InsertAsync(movie);

            var response = _mapper.Map<MovieDto>(movie);
            return response;
        }

        public async Task<MovieDto> Put(int CinemaId, int movieId, UpdateMovieDto movieDto)
        {

            var oldMovie = await _MovieRepository.GetAsync(CinemaId, movieId);

            _mapper.Map(movieDto, oldMovie);

            await _MovieRepository.UpdateAsync(oldMovie);

            var dto = _mapper.Map<MovieDto>(oldMovie);

            return dto;
        }

        public async Task<MovieDto> Delete(int CinemaId, int movieId)
        {
            var movie = await _MovieRepository.GetAsync(CinemaId, movieId);

            await _MovieRepository.DeleteAsync(movie);

            return null;
        }
    }
}
