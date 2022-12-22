using AutoMapper;
using Academy.Data.Dtos;
using Academy.Data.Entities;

namespace Academy.Data
{
    public class AcademyProfile : Profile
    {
        public AcademyProfile()
        {
            CreateMap<Item, ItemDto>();
            CreateMap<AddItemDto, Item>();
        }
    }
}
