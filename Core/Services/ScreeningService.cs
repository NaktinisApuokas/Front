using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using FobumCinema.Data.Dtos.Cinema;
using FobumCinema.Data.Dtos.Movie;
using FobumCinema.Data.Dtos.Screening;
using FobumCinema.Data.Entities;
using FobumCinema.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FobumCinema.Data.Repositories
{
    public interface IScreeningService
    {
        Task<IEnumerable<ScreeningDto>> GetAll(int movieId);
        Task<ScreeningDto> Get(int movieId, int screeningId);
        Task<ScreeningDto> Create(int movieId, CreateScreeningDto screeningDto);
        Task<ScreeningDto> Put(int movieId, int screeningId, UpdateScreeningDto screeningDto);
        Task<ScreeningDto> Delete(int movieId, int screeningId);
    }

    public class ScreeningService : IScreeningService
    {
        private readonly IScreeningRepository _ScreeningRepository;
        private readonly IMapper _mapper;

        public ScreeningService(IScreeningRepository ScreeningRepository, IMapper mapper)
        {
            _ScreeningRepository = ScreeningRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ScreeningDto>> GetAll(int movieId)
        {
            var screening = await _ScreeningRepository.GetAsync(movieId);
            return screening.Select(o => _mapper.Map<ScreeningDto>(o));
        }

        public async Task<ScreeningDto> Get(int movieId, int screeningId)
        {
            var screening = await _ScreeningRepository.GetAsync(movieId, screeningId);
            var dto = (_mapper.Map<ScreeningDto>(screening));

            return dto;
        }

        public async Task<ScreeningDto> Create(int movieId, CreateScreeningDto screeningDto)
        {
            var screening = _mapper.Map<Screening>(screeningDto);

            screening.MovieId = movieId;

            await _ScreeningRepository.InsertAsync(screening);

            var response = _mapper.Map<ScreeningDto>(screening);
            return response;
        }

        public async Task<ScreeningDto> Put(int movieId, int screeningId, UpdateScreeningDto screeningDto)
        {

            var oldScreening = await _ScreeningRepository.GetAsync(movieId, screeningId);

            _mapper.Map(screeningDto, oldScreening);

            await _ScreeningRepository.UpdateAsync(oldScreening);

            var dto = _mapper.Map<ScreeningDto>(oldScreening);

            return dto;
        }

        public async Task<ScreeningDto> Delete(int movieId, int screeningId)
        {
            var screening = await _ScreeningRepository.GetAsync(movieId, screeningId);

            await _ScreeningRepository.DeleteAsync(screening);

            return null;
        }
    }
}
