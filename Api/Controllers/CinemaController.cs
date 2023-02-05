using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FobumCinema.Data.Dtos.Cinema;
using FobumCinema.Data.Dtos.Movie;
using FobumCinema.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FobumCinema.Controllers
{

    [ApiController]
    [Route("api/cinemas")]
    public class CinemaController : ControllerBase
    {
        private readonly ICinemaService _CinemaService;

        public CinemaController(ICinemaService CinemaService)
        {
            _CinemaService = CinemaService;
        }

        [HttpGet]
        //[Authorize(Roles = UserRoles.SimpleUser)]
        public async Task<IActionResult> GetAll()
        {
            var result = await _CinemaService.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        //[Authorize(Roles = UserRoles.SimpleUser)]
        public async Task<IActionResult> Get(int id)
        {
            var cinema = await _CinemaService.Get(id);
            if (cinema == null) return NotFound($"Cinema with id '{id}' not found.");

            return Ok(cinema);
        }


        [HttpPost]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> Post(CreateCinemaDto cinemaDto)
        {
            var cinema = await _CinemaService.Create(cinemaDto);

            return Created($"/api/cinemas/{cinema.Id}", cinema);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateCinemaDto CinemaDto)
        {
            var cinema = await _CinemaService.Put(CinemaDto, id);
            if (cinema == null) return NotFound($"Couldn't find a cinema with id of {id}");

            return Ok(cinema);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var cinema = await _CinemaService.Get(id);
            if (cinema == null) return NotFound($"Cinema with id '{id}' not found.");

            await _CinemaService.Delete(id);

            return NoContent();
        }
    }
}