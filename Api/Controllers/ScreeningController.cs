using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FobumCinema.Data.Dtos.Screening;
using FobumCinema.Data.Entities;
using FobumCinema.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FobumCinema.Controllers
{
    [ApiController]
    [Route("api/cinemas/{CinemaId}/movies/{MovieId}/screening")]
    public class ScreeningController : ControllerBase
    {
        private readonly IMovieRepository _MovieRepository;
        private readonly IScreeningService _ScreeningService;

        public ScreeningController(IMovieRepository MovieRepository, IScreeningService ScreeningService)
        {
            _MovieRepository = MovieRepository;
            _ScreeningService = ScreeningService;
        }

        [HttpGet]
        public IActionResult GetAll(int movieId)
        {
            var result = _ScreeningService.GetAll(movieId);
            return Ok(result);
        }

        [HttpGet("{screeningId}")]
        public IActionResult Get(int movieId, int screeningId)
        {
            var screening = _ScreeningService.Get(movieId, screeningId);
            if (screening == null) return NotFound();

            return Ok(screening);
        }

        //insert
        [HttpPost]
        public IActionResult Post(int cinemaId, int movieId, CreateScreeningDto screeningDto)
        {
            var movie = _MovieRepository.GetAsync(movieId);
            if (movie == null) return NotFound($"Couldn't find a movie with id of {movieId}");


            var screening = _ScreeningService.Create(movieId, screeningDto);

            return Created($"/api/cinemas/{cinemaId}/movies/{movieId}/screenings/{screening.Id}", screening);
        }

        //update
        [HttpPut("{screeningId}")]
        public IActionResult Put(int movieId, int screeningId, UpdateScreeningDto screeningDto)
        {
            var movie = _MovieRepository.GetAsync(movieId);
            if (movie == null) return NotFound($"Couldn't find a movie with id of {movieId}");

            var oldScreening = _ScreeningService.Put(movieId, screeningId, screeningDto);
            if (oldScreening == null) return NotFound();

            return Ok(oldScreening);
        }

        [HttpDelete("{screeningId}")]
        public IActionResult Delete(int movieId, int screeningId)
        {
            var screening = _ScreeningService.Get(movieId, screeningId);
            if (screening == null) return NotFound();

            _ScreeningService.Delete(movieId, screeningId);

            return NoContent();
        }
    }
}
