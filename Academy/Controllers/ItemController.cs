using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Academy.Data.Dtos;
using Academy.Data.Entities;
using Academy.Data.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;

namespace Academy.Controllers
{
    [EnableCors("CORSPolicy")]
    [ApiController]
    [Route("api/listpage")]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _ItemRepository;
        private readonly IMapper _mapper;

        public ItemController(IItemRepository ItemRepository, IMapper mapper)
        {
            _ItemRepository = ItemRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<ItemDto>> Get()
        {
            return (await _ItemRepository.Get()).Select(o => _mapper.Map<ItemDto>(o));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> Get(int id)
        {
            var item = await _ItemRepository.Get(id);
            if (item == null) return NotFound($"Cinema with id '{id}' not found.");

            return Ok(_mapper.Map<ItemDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<ItemDto>> Post(AddItemDto itemDto)
        {
            var item = _mapper.Map<Item>(itemDto);

            await _ItemRepository.Create(item);

            return Created($"/api/listpage/{item.Id}", _mapper.Map<ItemDto>(item));
        }

    }
}
