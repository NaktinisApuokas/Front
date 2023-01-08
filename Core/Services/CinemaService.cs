using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using FobumCinema.Data.Dtos.Cinema;
using FobumCinema.Data.Entities;
using FobumCinema.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FobumCinema.Data.Repositories
{
    public interface ICinemaService
    {
        Task<IEnumerable<CinemaDto>> GetAll();
        Task<CinemaDto> Get(int id);
        Task<CinemaDto> Create(CreateCinemaDto cinema);
        Task<CinemaDto> Put(UpdateCinemaDto cinema, int id);
        Task<CinemaDto> Delete(int id);
    }

    public class CinemaService : ICinemaService
    {
        private readonly ICinemaRepository _FobumCinemaRepository;
        private readonly IMapper _mapper;

        public CinemaService(ICinemaRepository fobumCinemaRepository, IMapper mapper)
        {
            _FobumCinemaRepository = fobumCinemaRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CinemaDto>> GetAll()
        {
            return (await _FobumCinemaRepository.GetAll()).Select(o => _mapper.Map<CinemaDto>(o));
        }

        public async Task<CinemaDto> Get(int id)
        {
            var cinema = await _FobumCinemaRepository.Get(id);
            var dto = (_mapper.Map<CinemaDto>(cinema));

            return dto;
        }

        public async Task<CinemaDto> Create(CreateCinemaDto cinemaDto)
        {
            var cinema = _mapper.Map<Cinema>(cinemaDto);

            await _FobumCinemaRepository.Create(cinema);

            var response = _mapper.Map<CinemaDto>(cinema);
            return response;
        }

        public async Task<CinemaDto> Put(UpdateCinemaDto CinemaDto, int id)
        {

            var cinema = await _FobumCinemaRepository.Get(id);

            _mapper.Map(CinemaDto, cinema);

            await _FobumCinemaRepository.Put(cinema);

            var dto = _mapper.Map<CinemaDto>(cinema);

            return dto;
        }

        public async Task<CinemaDto> Delete(int id)
        {
            var cinema = await _FobumCinemaRepository.Get(id);

            await _FobumCinemaRepository.Delete(cinema);

            return null;

        }
    }
}
