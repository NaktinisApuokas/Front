using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FobumCinema.Data.Dtos.Movie;
using FobumCinema.Data.Entities;
using FobumCinema.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FobumCinema.Controllers
{
    [ApiController]
    [Route("api/cinemas/{CinemaId}/movies")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _MovieRepository;
        private readonly ICinemaRepository _CinemaRepository;
        private readonly IMapper _mapper;
        

        public MovieController(IMovieRepository MovieRepository, IMapper mapper, ICinemaRepository CinemaRepository)
        {
            _MovieRepository = MovieRepository;
            _mapper = mapper;
            _CinemaRepository = CinemaRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<MovieDto>> GetAllAsync(int cinemaId)
        {
            var movies = await _MovieRepository.GetAsync(cinemaId);
            return movies.Select(o => _mapper.Map<MovieDto>(o));
        }

        [HttpGet("{movieId}")]
        public async Task<ActionResult<MovieDto>> GetAsync(int cinemaId, int movieId)
        {
            var movie = await _MovieRepository.GetAsync(cinemaId, movieId);
            if (movie == null) return NotFound();

            return Ok(_mapper.Map<MovieDto>(movie));
        }

        [HttpPost]
        public async Task<ActionResult<MovieDto>> PostAsync(int cinemaId, CreateMovieDto movieDto)
        {
            var cinema = await _CinemaRepository.Get(cinemaId);
            if (cinema == null) return NotFound($"Couldn't find a movie with id of {cinemaId}");

            var movie = _mapper.Map<Movie>(movieDto);
            movie.CinemaId = cinemaId; 

            await _MovieRepository.InsertAsync(movie);

            return Created($"/api/cinemas/{cinemaId}/movies/{movie.Id}", _mapper.Map<MovieDto>(movie));
        }

        [HttpPut("{movieId}")]
        public async Task<ActionResult<MovieDto>> PutAsync(int CinemaId, int movieId, UpdateMovieDto movieDto)
        {
            var cinema = await _CinemaRepository.Get(CinemaId);
            if (cinema == null) return NotFound($"Couldn't find a movie with id of {CinemaId}");

            var oldMovie = await _MovieRepository.GetAsync(CinemaId, movieId);
            if (oldMovie == null)
                return NotFound();

            _mapper.Map(movieDto, oldMovie);

            await _MovieRepository.UpdateAsync(oldMovie);

            return Ok(_mapper.Map<MovieDto>(oldMovie));
        }

        [HttpDelete("{movieId}")]
        public async Task<ActionResult> DeleteAsync(int CinemaId, int movieId)
        {
            var movie = await _MovieRepository.GetAsync(CinemaId, movieId);
            if (movie == null)
                return NotFound();

            await _MovieRepository.DeleteAsync(movie);

            return NoContent();
        }
    }
}
   