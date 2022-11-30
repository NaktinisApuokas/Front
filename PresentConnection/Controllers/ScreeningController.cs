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
        private readonly IMapper _mapper;
        private readonly IScreeningRepository _ScreeningRepository;

        public ScreeningController(IMovieRepository MovieRepository, IMapper mapper, IScreeningRepository ScreeningRepository)
        {
            _MovieRepository = MovieRepository;
            _mapper = mapper;
            _ScreeningRepository = ScreeningRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<ScreeningDto>> GetAllAsync(int movieId)
        {
            var movies = await _ScreeningRepository.GetAsync(movieId);
            return movies.Select(o => _mapper.Map<ScreeningDto>(o));
        }

        [HttpGet("{screeningId}")]
        public async Task<ActionResult<ScreeningDto>> GetAsync(int movieId, int screeningId)
        {
            var movie = await _ScreeningRepository.GetAsync(movieId, screeningId);
            if (movie == null) return NotFound();

            return Ok(_mapper.Map<ScreeningDto>(movie));
        }

        //insert
        [HttpPost]
        public async Task<ActionResult<ScreeningDto>> PostAsync(int cinemaId, int movieId, CreateScreeningDto screeningDto)
        {
            var movie = await _MovieRepository.GetAsync(movieId);
            if (movie == null) return NotFound($"Couldn't find a movie with id of {movieId}");

            var screening = _mapper.Map<Screening>(screeningDto);
            screening.MovieId = movieId;

            await _ScreeningRepository.InsertAsync(screening);

            return Created($"/api/cinemas/{cinemaId}/movies/{movieId}/screenings/{screening.Id}", _mapper.Map<ScreeningDto>(screening));
        }

        //update
        [HttpPut("{screeningId}")]
        public async Task<ActionResult<ScreeningDto>> PostAsync(int movieId, int screeningId, UpdateScreeningDto screeningDto)
        {
            var movie = await _MovieRepository.GetAsync(movieId);
            if (movie == null) return NotFound($"Couldn't find a movie with id of {movieId}");

            var oldScreening = await _ScreeningRepository.GetAsync(movieId, screeningId);
            if (oldScreening == null)
                return NotFound();

            _mapper.Map(screeningDto, oldScreening);

            await _ScreeningRepository.UpdateAsync(oldScreening);

            return Ok(_mapper.Map<ScreeningDto>(oldScreening));
        }

        [HttpDelete("{screeningId}")]
        public async Task<ActionResult> DeleteAsync(int movieId, int screeningId)
        {
            var screening = await _ScreeningRepository.GetAsync(movieId, screeningId);
            if (screening == null)
                return NotFound();

            await _ScreeningRepository.DeleteAsync(screening);

            return NoContent();
        }
    }
}
