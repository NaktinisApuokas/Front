using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;
using AutoMapper;
using FobumCinema.Data.Dtos.Ticket;
using FobumCinema.Data.Entities;
using FobumCinema.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FobumCinema.Controllers
{
    [ApiController]
    [Route("api/cinemas/{CinemaId}/movies/{MovieId}/screening/{ScreeningId}/tickets")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketRepository _TicketRepository;
        private readonly IMapper _mapper;
        private readonly IScreeningRepository _ScreeningRepository;

        public TicketController(ITicketRepository TicketRepository, IMapper mapper, IScreeningRepository ScreeningRepository)
        {
            _TicketRepository = TicketRepository;
            _mapper = mapper;
            _ScreeningRepository = ScreeningRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<TicketDto>> GetAllAsync(int screeningId)
        {
            var screening = await _TicketRepository.GetAsync(screeningId);
            return screening.Select(o => _mapper.Map<TicketDto>(o));
        }

        [HttpGet("{ticketId}")]
        public async Task<ActionResult<TicketDto>> GetAsync(int screeningId, int ticketId)
        {
            var ticket = await _ScreeningRepository.GetAsync(screeningId, ticketId);
            if (ticket == null) return NotFound();

            return Ok(_mapper.Map<TicketDto>(ticket));
        }

        [HttpPost]
        public async Task<ActionResult<TicketDto>> PostAsync(int cinemaId, int movieId, int screeningId, CreateTicketDto ticketDto)
        {
            var screening = await _ScreeningRepository.GetAsync(screeningId);
            if (screening == null) return NotFound($"Couldn't find a screening with id of {screeningId}");

            var ticket = _mapper.Map<Ticket>(ticketDto);
            ticket.ScreeningId = screeningId;

            await _TicketRepository.InsertAsync(ticket);

            return Created($"/api/cinemas/{cinemaId}/movies/{movieId}/screenings/{screeningId}/tickets/{ticket.Id}", _mapper.Map<TicketDto>(ticket));
        }

        [HttpPut("{ticketId}")]
        public async Task<ActionResult<TicketDto>> PostAsync(int screeningId, int ticketId, UpdateTicketDto ticketDto)
        {
            var screening = await _ScreeningRepository.GetAsync(screeningId);
            if (screening == null) return NotFound($"Couldn't find a screening with id of {screeningId}");

            var oldticket = await _TicketRepository.GetAsync(screeningId, ticketId);
            if (oldticket == null)
                return NotFound();

            _mapper.Map(ticketDto, oldticket);

            await _TicketRepository.UpdateAsync(oldticket);

            return Ok(_mapper.Map<TicketDto>(oldticket));
        }

        [HttpDelete("{ticketId}")]
        public async Task<ActionResult> DeleteAsync(int screeningId, int tickerId)
        {
            var ticket = await _TicketRepository.GetAsync(screeningId, tickerId);
            if (ticket == null)
                return NotFound();

            await _TicketRepository.DeleteAsync(ticket);

            return NoContent();
        }
    }
}
