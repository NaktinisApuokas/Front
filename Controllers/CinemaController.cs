using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FobumCinema.Data.Dtos.Cinema;
using FobumCinema.Data.Dtos.Movie;
using FobumCinema.Data.Entities;
using FobumCinema.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FobumCinema.Controllers
{

    [ApiController]
    [Route("api/cinemas")]
    public class CinemaController : ControllerBase
    {
        private readonly ICinemaRepository _CinemaRepository;
        private readonly IMapper _mapper;

        public CinemaController(ICinemaRepository CinemaRepository, IMapper mapper)
        {
            _CinemaRepository = CinemaRepository;
            _mapper = mapper;
        }

        [HttpGet]
        //[Authorize(Roles = UserRoles.SimpleUser)]
        public async Task<IEnumerable<CinemaDto>> GetAll()
        {
            return (await _CinemaRepository.GetAll()).Select(o => _mapper.Map<CinemaDto>(o));
        }

        [HttpGet("{id}")]
        //[Authorize(Roles = UserRoles.SimpleUser)]
        public async Task<ActionResult<CinemaDto>> Get(int id)
        {
            var cinema = await _CinemaRepository.Get(id);
            if (cinema == null) return NotFound($"Cinema with id '{id}' not found.");

            return Ok(_mapper.Map<CinemaDto>(cinema));
        }


        [HttpPost]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<CinemaDto>> Post(CreateCinemaDto cinemaDto)
        {
            var cinema = _mapper.Map<Cinema>(cinemaDto);

            await _CinemaRepository.Create(cinema);

            return Created($"/api/cinemas/{cinema.Id}", _mapper.Map<CinemaDto>(cinema));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CinemaDto>> Put(int id, UpdateCinemaDto CinemaDto)
        {
            var cinema = await _CinemaRepository.Get(id);
            if (cinema == null) return NotFound($"Couldn't find a cinema with id of {id}");

            _mapper.Map(CinemaDto, cinema);

            await _CinemaRepository.Put(cinema);

            return Ok(_mapper.Map<CinemaDto>(cinema));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CinemaDto>> Delete(int id)
        {
            var cinema = await _CinemaRepository.Get(id);
            if (cinema == null) return NotFound($"Cinema with id '{id}' not found.");

            await _CinemaRepository.Delete(cinema);

            return NoContent();
        }
    }
}