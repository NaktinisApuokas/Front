using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;
using FobumCinema.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FobumCinema.Data.Repositories
{
    public interface ITicketRepository
    {
        Task<Ticket> GetAsync(int screeningId, int ticketId);
        Task<List<Ticket>> GetAsync(int ticketId);
        Task InsertAsync(Ticket ticket);
        Task UpdateAsync(Ticket ticket);
        Task DeleteAsync(Ticket ticket);
    }

    public class TicketRepository : ITicketRepository
    {
        private readonly FobumCinemaContext _FobumCinemaContext;

        public TicketRepository(FobumCinemaContext fobumCinemaContext)
        {
            _FobumCinemaContext = fobumCinemaContext;
        }

        public async Task<Ticket> GetAsync(int screeningId, int ticketId)
        {
            return await _FobumCinemaContext.Ticket.FirstOrDefaultAsync(o => o.ScreeningId == screeningId && o.Id == ticketId);
        }

        public async Task<List<Ticket>> GetAsync(int screeningId)
        {
            return await _FobumCinemaContext.Ticket.Where(o => o.ScreeningId == screeningId).ToListAsync();
        }

        public async Task InsertAsync(Ticket ticket)
        {
            _FobumCinemaContext.Ticket.Add(ticket);
            await _FobumCinemaContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Ticket ticket)
        {
            _FobumCinemaContext.Ticket.Update(ticket);
            await _FobumCinemaContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Ticket ticket)
        {
            _FobumCinemaContext.Ticket.Remove(ticket);
            await _FobumCinemaContext.SaveChangesAsync();
        }
    }
}
