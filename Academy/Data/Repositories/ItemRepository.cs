using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Academy.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Academy.Data.Repositories
{
    public interface IItemRepository
    {
        Task<IEnumerable<Item>> Get();
        Task<Item> Get(int id);
        Task<Item> Create(Item item);
    }
    public class ItemRepository : IItemRepository
    {
        private readonly AcademyContext _AcademyContext;

        public ItemRepository(AcademyContext academyContext)
        {
            _AcademyContext = academyContext;
        }

        public async Task<IEnumerable<Item>> Get()
        {
            return await _AcademyContext.Item.ToListAsync();
        }

        public async Task<Item> Get(int id)
        {
            return await _AcademyContext.Item.FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<Item> Create(Item item)
        {
            _AcademyContext.Item.Add(item);
            await _AcademyContext.SaveChangesAsync();

            return item;
        }


    }
}
