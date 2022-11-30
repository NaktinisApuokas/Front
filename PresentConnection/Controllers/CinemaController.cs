using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FobumCinema.Auth.Model;
using FobumCinema.Data.Dtos.Cinema;
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
        private readonly IAuthorizationService _authorizationService;

        public CinemaController(ICinemaRepository CinemaRepository, IMapper mapper, IAuthorizationService authorizationService)
        {
            _CinemaRepository = CinemaRepository;
            _mapper = mapper;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        [Authorize(Roles = UserRoles.SimpleUser)]
        public async Task<IEnumerable<CinemaDto>> GetAll()
        {
            return (await _CinemaRepository.GetAll()).Select(o => _mapper.Map<CinemaDto>(o));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = UserRoles.SimpleUser)]
        public async Task<ActionResult<CinemaDto>> Get(int id)
        {
            var cinema = await _CinemaRepository.Get(id);
            if (cinema == null) return NotFound($"Cinema with id '{id}' not found.");

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, cinema, PolicyNames.SameUser);

            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            return Ok(_mapper.Map<CinemaDto>(cinema));
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<CinemaDto>> Post(CreateCinemaDto cinemaDto)
        {
            var cinema = _mapper.Map<Cinema>(cinemaDto);

            await _CinemaRepository.Create(cinema);

            return Created($"/api/cinemas/{cinema.Id}", _mapper.Map<CinemaDto>(cinema));
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