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
        private readonly IMovieService _MovieService;
        private readonly ICinemaRepository _CinemaRepository;
        

        public MovieController(IMovieService MovieService, ICinemaRepository CinemaRepository)
        {
            _MovieService = MovieService;
            _CinemaRepository = CinemaRepository;
        }

        [HttpGet]
        public IActionResult GetAll(int cinemaId)
        {
            var result = _MovieService.GetAll(cinemaId);
            return Ok(result);
        }

        [HttpGet("{movieId}")]
        public IActionResult Get(int cinemaId, int movieId)
        {
            var movie = _MovieService.Get(cinemaId, movieId);
            if (movie == null) return NotFound();

            return Ok(movie);
        }

        [HttpPost]
        public IActionResult Post(int cinemaId, CreateMovieDto movieDto)
        {
            var cinema = _CinemaRepository.Get(cinemaId);
            if (cinema == null) return NotFound($"Couldn't find a cinema with id of {cinemaId}");

            var movie = _MovieService.Create(cinemaId, movieDto);

            return Created($"/api/cinemas/{cinemaId}/movies/{movie.Id}", movie);
        }

        [HttpPut("{movieId}")]
        public IActionResult Put(int CinemaId, int movieId, UpdateMovieDto movieDto)
        {
            var cinema = _CinemaRepository.Get(CinemaId);
            if (cinema == null) return NotFound($"Couldn't find a cinema with id of {CinemaId}");

            var oldMovie = _MovieService.Put(CinemaId, movieId, movieDto);
            if (oldMovie == null) return NotFound();

            return Ok(oldMovie);
        }

        [HttpDelete("{movieId}")]
        public IActionResult Delete(int CinemaId, int movieId)
        {
            var movie = _MovieService.Get(CinemaId, movieId);
            if (movie == null) return NotFound();

             _MovieService.Delete(CinemaId, movieId);

            return NoContent();
        }
    }
}
   