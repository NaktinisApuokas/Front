using AutoMapper;
using FobumCinema.Data.Dtos.Auth;
using FobumCinema.Data.Dtos.Cinema;
using FobumCinema.Data.Dtos.Movie;
using FobumCinema.Data.Dtos.Screening;
using FobumCinema.Data.Entities;

namespace FobumCinema.Core
{
    public class FobumCinemaProfile : Profile
    {
        public FobumCinemaProfile()
        {
            CreateMap<Cinema, CinemaDto>();
            CreateMap<CreateCinemaDto, Cinema>();
            CreateMap<UpdateCinemaDto, Cinema>();

            CreateMap<CreateMovieDto, Movie>();
            CreateMap<UpdateMovieDto, Movie>();
            CreateMap<Movie, MovieDto>();

            CreateMap<CreateScreeningDto, Screening>();
            CreateMap<UpdateScreeningDto, Screening>();
            CreateMap<Screening, ScreeningDto>();

            CreateMap<FobumCinemaUser, UserDto>();
        }
    }
}